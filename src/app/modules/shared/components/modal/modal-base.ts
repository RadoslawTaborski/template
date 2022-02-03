import { ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from "@angular/core";
import { NgForm, FormGroup } from '@angular/forms';

export interface ModalModel {
    open(content: TemplateRef<any>): void;
    checkAndSend?(form: NgForm | FormGroup): void;
    go(result: {}): void;
}

export class ModalBase implements ModalModel {

    openedModal!: NgbModalRef;
    closeResult = '';

    constructor(private modalService: { open: (arg0: any, arg1: { ariaLabelledBy: string; }) => NgbModalRef; }) { }

    checkAndSend(form: { valid: any; value: any; }) {
        if (form.valid) {
            this.openedModal.close(form.value);
        } else {
            console.log('form invalid');
        }
    }

    open(content: any) {
        this.openedModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        this.openedModal.result.then((result) => {
            if(result!=="accept"){
                this.closeResult = `Closed with: ${result}`;
                this.go(this.closeResult);
            }
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.go(this.closeResult);
        });
    }

    close(){
        this.openedModal.close("accept");
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    go(result: any) {
        throw new Error('you should override go method');
    }
}
