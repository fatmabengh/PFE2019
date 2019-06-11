import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms';
import {FormulaireService} from '../shared/formulaire.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sendform',
  templateUrl: './sendform.component.html',
  styleUrls: ['./sendform.component.scss']
})
export class SendformComponent implements OnInit {
Sendform: FormGroup;
editorContent: string;
cptmail;
traceMail: any;
selectedRow;
  constructor(private fb: FormBuilder,private formService: FormulaireService,private msg: ToastrService) { }

  ngOnInit() {
    this.create();
    this.formService.TraceMailer().subscribe((data:any)=> {
      this.traceMail=data;
      this.cptmail=this.traceMail.length;
      console.log(data);

    });
  }
  create(){
    this.Sendform = this.fb.group({
      'subject': new FormControl(''),
      'recipient': new FormControl(''),
      'CopieCache': new FormControl(''),
      'body': new FormControl(''),
      
  });
  }
  SendForm(){
    this.editorContent= this.Sendform.get('body').value;
    this.formService.SendFormtoUser(this.Sendform.value).subscribe((data: any) => {
      this.msg.success(data);
    
    });
    this.Sendform.reset();
  }
  RowSelected(u:any){
    this.selectedRow=u;
  
   }
}
