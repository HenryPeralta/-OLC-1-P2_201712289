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

//------------------Estructura-Python--------------------------------------

type task struct {
	Name    string `json:"Name"`
	Content string `json:"Content"`
	Type    string `json:"Type"`
	Token[]token `json:"Tokens"`
	Error[]errors `json:"Error"`
	Respuesta[]string `json:"Respuesta"`
	ErroresSintacticos[]error_sintactico `json:"ErroresSintacticos"`
	Traduccion string `json:"Traduccion"`
}

type token struct {
	Auxlex string `json:"auxlex"`
	Fila int `json:"fila"`
	Columna int `json:"columna"`
	Indice int `json:"indice"`
	TipoToken int `json:"tipoDelToken"`
	Valor string `json:"valor"`
}

type errors struct {
	Auxlex string `json:"auxlex"`
	Fila int `json:"fila"`
	Columna int `json:"columna"`
	Indice int `json:"indice"`
	TipoToken int `json:"tipoDelToken"`
	Valor string `json:"valor"`
}

type error_sintactico struct {
	Fila int `json:"fila"`
	Columna int `json:"columna"`
	Descripcio string `json:"descripcion"`
}

var tarea task

//------------------Estructura-JavaScript--------------------------------------

type jison struct {
	Name    string `json:"Name"`
	Content string `json:"Content"`
	Type    string `json:"Type"`
	Token[]tokenjs `json:"Tokens"`
	Error[]errorsjs `json:"Error"`
	ErroresSintacticos[]error_sintactico_js `json:"ErroresSintacticos"`
	Traduccion string `json:"Traduccion"`
}

type tokenjs struct {
	TipoToken string `json:"tipoDelToken"`
	Auxlex string `json:"auxlex"`
	Fila int `json:"fila"`
	Columna int `json:"columna"`
}

type errorsjs struct {
	TipoToken int `json:"tipoDelToken"`
	Auxlex string `json:"auxlex"`
	Fila int `json:"fila"`
	Columna int `json:"columna"`
}

type error_sintactico_js struct {
	TipoToken int `json:"tipoDelToken"`
	Auxlex string `json:"auxlex"`
	Fila int `json:"fila"`
	Columna int `json:"columna"`
}

var java jison

//type allTask []task

//var tasks = allTask{
//	{
//		Name:    "ejemplo",
//		Content: "este es un ejemplo",
//	},
//}

//-------------------python------------------------------------------------

func getTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tarea)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	//	var newTask task
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "insert a valid task")
	}

	json.Unmarshal(reqBody, &tarea)


//--------------------------------------
	jsonReq, err := json.Marshal(tarea)
	req, err := http.Post("http://localhost:3000/node", "application/json; charset = utf-8", bytes.NewBuffer(jsonReq))
	
	if err != nil {
	}

	defer req.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(req.Body)
	json.Unmarshal(bodyBytes, &tarea)
	fmt.Println(string(bodyBytes))
	//fmt.Fprintf(w, string(bodyBytes))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(tarea)
	
}

//------------------------jison------------------------------------------------

func getjison(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(java)
}

func createjison(w http.ResponseWriter, r *http.Request) {
	//	var newTask task
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "insert a valid task")
	}

	json.Unmarshal(reqBody, &java)


//--------------------------------------
	jsonRequest, err := json.Marshal(java)
	req, err := http.Post("http://localhost:4000/nodejs", "application/json; charset = utf-8", bytes.NewBuffer(jsonRequest))
	
	if err != nil {
	}

	defer req.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(req.Body)
	json.Unmarshal(bodyBytes, &java)
	fmt.Println(string(bodyBytes))
	//fmt.Fprintf(w, string(bodyBytes))

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(java)
	
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
	router.HandleFunc("/jison", getjison).Methods("GET")
	router.HandleFunc("/jison", createjison).Methods("POST")
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public")))
	log.Println("Escuchando en http://localhost:8080")
	http.ListenAndServe(":8080", router)
	//client()
}
