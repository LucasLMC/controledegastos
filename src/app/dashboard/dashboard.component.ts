import { Component, OnInit } from '@angular/core';
import { Controle } from './controle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // constructor() { }

  dados = []
  controle: Controle = new Controle
  valores: Controle[] = []
  ngOnInit(): void {
    this.getLocalStorage()

    setInterval(() => {
      this.getLocalStorage()
    }, 5000)
  }

  saveValue() {
    const controle = this.controle

    if (controle.id != undefined || !controle) {


      for (let dado in this.dados) {
        if (this.dados[dado].id === controle.id) {
          this.dados[dado] = {
            id: controle.id,
            detalhes: controle.detalhes,
            valor: controle.valor,
            tipo: controle.tipo,
            data_valor: controle.data_valor
          }
        }
      }
    } else {
      this.controle.id = new Date().getTime()
      this.dados.push(this.controle)
    }

    this.saveLocalStorage()

    this.controle = new Controle

    this.getLocalStorage()
  }

  getLocalStorage() {
    if (localStorage.hasOwnProperty("controle")) {

      let objectArray: Controle[] = JSON.parse(localStorage.getItem("controle"))

      let array: Controle[] = objectArray.sort((n1, n2) => {
        if (n1.data_valor > n2.data_valor) {
          return -1;
        }
        if (n1.data_valor < n2.data_valor) {
          return 1;
        }

        return 0;
      });

      this.dados = array
    }
  }

  saveLocalStorage() {
    console.log(this.dados);

    localStorage.setItem('controle', JSON.stringify(this.dados))
    this.getLocalStorage()
  }


}
