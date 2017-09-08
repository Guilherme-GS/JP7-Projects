import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from 'angularfire2/database';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  editando:boolean=false;
  msgErro:boolean=false;

  tarefas: FirebaseListObservable<any[]>;
  tarefa: FirebaseObjectObservable<any>;
  inputTarefa:string;

  constructor (private db:AngularFireDatabase){
    this.tarefas =db.list('/Tarefas');
  }

 

  adicionarTarefa(valor:string):void{
    if(valor!=""){
      this.tarefas.push({valor:valor}).then(fn=>{
        this.inputTarefa="";
      })
      .catch(error => console.log(error));

    }else{
      this.msgErro = true;
      setTimeout(()=>{    //<<<---    using ()=> syntax
        this.msgErro = false;
      },3000);
    }
    
  }

  excluirTarefa(key:string):void{
    this.tarefas.remove(key)
     .catch(error => console.log(error));
  }

  editarTarefa(tarefa:any){
    
    this.editando=true;
    this.tarefa=tarefa;
  }

  cancelarEdicao(){
    this.editando=false;
    this.tarefa=null;
  }

  atualizarTarefa(key:string, value:string):void{
   const promise= this.tarefas.set(key,{valor:value});
    promise
    .then(_ => this.editando=false)
    .catch(err => console.log(err));
  }

}
