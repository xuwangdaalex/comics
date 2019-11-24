import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "../api/api.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute } from '@angular/router';


import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.sass']
})
export class ComicDetailComponent implements OnInit {

  animal: string;
  name: string;
  comic;
  dataReady;
  closeResult;
  hobbyName = '';

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.apiService.comics.subscribe(result => {
      this.comic = result.filter((item)=>{
        return item.id == this.route.snapshot.params.id
      })[0]
      if(this.comic && this.comic.hobbies){
        this.dataReady = true
      }
    });
  }

  deleteHobbyFromUser(hobbyId){
    if (confirm("Are you sure to delete it?")) {
      this.apiService.deleteHobbyFromUser(this.comic.id, hobbyId)
    } else {
      //txt = "You pressed Cancel!";
    }
  }
  addHobbyToUser(){
    this.apiService.addHobbyToUser(this.comic.id, this.hobbyName)
    this.hobbyName = ''
  }

  open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
