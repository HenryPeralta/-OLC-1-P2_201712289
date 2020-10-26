package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type task struct {
	Name    string `json:"Name"`
	Content string `json:"Content"`
	Type    string `json:"Type"`
	Token[] `json:"Token"`
}

type token struct {
	Auxlex string `json:"Auxlex"`
}

var tarea task

//type allTask []task

//var tasks = allTask{
//	{
//		Name:    "ejemplo",
//		Content: "este es un ejemplo",
//	},
//}

func getTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(tarea)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	//	var newTask task
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "insert a valid task")
	}

	json.Unmarshal(reqBody, &tarea)
	//	tasks = append(tasks, newTask)

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(tarea)

	jsonReq, err := json.Marshal(tarea)
	//var jsonStr = []byte(`{"Name":"` + tarea.Name + `","Content":"` + tarea.Content + `","Type":"` + tarea.Type + `"}`)
	//var jsonStr = []byte(`{"Name":"hola"}`)
	req, err := http.NewRequest("POST", "http://localhost:3000/node", bytes.NewBuffer(jsonReq))
	req.Header.Set("Content-type", "application/json")
	
	/*client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println("Response: ", string(body))
	resp.Body.Close()*/

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	fmt.Println(string(bodyBytes))
	fmt.Fprintf(w, string(bodyBytes))
}

/*func client() {
	//var jsonStr = []byte(`{"Name":"` + tarea.Name + `", "Content":"` + tarea.Content + `", "Type":"` + tarea.Type + `"}`)
	var jsonStr = []byte(`{"Name":"hola", "Content":"kokok", "Type":"lolol"}`)
	req, err := http.NewRequest("POST", "http://localhost:8080/tasks", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	body, err := ioutil.ReadAll(resp.Body)
	fmt.Println("Response: ", string(body))
	resp.Body.Close()
}*/

func main() {

	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/tasks", getTasks).Methods("GET")
	router.HandleFunc("/tasks", createTask).Methods("POST")
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public")))
	log.Println("Escuchando en http://localhost:8080")
	http.ListenAndServe(":8080", router)
	//client()
}
