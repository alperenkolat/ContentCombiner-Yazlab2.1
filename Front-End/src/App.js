import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [list1, setList] = useState([]);
  const [newitem, setitem] = useState("Metin giriniz");
  const [Cont, ContText] = useState("Ortak metin");
  const [Contime, setContime] = useState("10 ms");
  const submithandle = (e) => {
    e.preventDefault();
    const data = {
      Cont,
    };
    const data2 = {
      Cont: list1,
    };
    toast("kaydedildi!");
    fetch("http://localhost:8080/content1", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json(String))
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const submithandle1 = (e) => {
    e.preventDefault();
    console.log("2");
    toast("Birleştiriyor...!");

    fetch("http://localhost:8080/content2", {
      method: "POST",
      body: JSON.stringify(list1),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        const textab = data.split("~");
        ContText(textab[0]);
        setContime(textab[1] + " ms");
      })

      .catch((err) => console.log(err));
    toast(Contime);
  };

  return (
    <div className="App">
      <h1 class="text-bg-danger">Content Combiner</h1>

      <div class="container text-lg-center">
        <div class="row justify-content-center">
          <div class="col-4">
            <label htmlfor="exampleFormControlTextarea1" class="form-label">
              <strong>Metin giriniz</strong>
            </label>
            <textarea
              lang="tr"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="10"
              value={newitem}
              onChange={(e) => setitem(e.target.value)}
            ></textarea>

            <button
              onClick={() => setList([...list1, newitem])}
              class="btn btn-primary"
              type="button"
            >
              Ekle
            </button>
          </div>
          <div class="col-4">
            <label for="exampleFormControlTextarea1" class="form-label">
              <strong>Metin giriniz</strong>
            </label>
            <textarea
              lang="tr"
              class="form-control"
              id="exampleFormControlTextarea2"
              rows="10"
            ></textarea>

            <button class="btn btn-primary" type="button">
              Ekle
            </button>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-3 P-4">
            <h2>Eklenen kelimeler</h2>
            <ul class="list-group list-group-flush">
              {list1?.map((item) => (
                <li className="list-group-item">{item}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={submithandle}>
            <div class="row justify-content-center  p-5">
              <div class="col-6 ">
                <label
                  for="exampleFormControlTextarea1"
                  class="form-label text-xl-center"
                >
                  <strong>Birleşik hali</strong>
                </label>
                <textarea
                  lang="tr"
                  class="form-control"
                  name="texta"
                  rows="10"
                  value={Cont}
                  onChange={(e) => ContText(e.target.value)}
                ></textarea>
              </div>
              <div class="col-3">
                <div class="row justify-content-end p-5">
                  <button
                    class="btn btn-danger"
                    onClick={submithandle1}
                    type="button"
                  >
                    Birleştir
                  </button>
                </div>
                <div class="row justify-content-end  p-5 ">
                  <button class="btn btn-success" type="submit">
                    Kaydet
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
