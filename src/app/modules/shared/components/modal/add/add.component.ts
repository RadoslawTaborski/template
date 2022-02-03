import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ModalBase } from '../modal-base';
import { AddItemCheckboxes, AddItemCheckboxesModel, AddItemCheckboxModel, AddItemConfig, AddItemInputModel, AddItemModel, AddItemNumberModel, AddItemRadioModel, AddItemSelect } from "../add/add-config"

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends ModalBase implements OnInit {

  @Input()
  config!: AddItemConfig;
  @Output() addAction = new EventEmitter<{ result: AddOption, details: string }>();

  constructor(modalService: NgbModal) {
    super(modalService);
  }

  ngOnInit(): void {
  }

  override go(result: any) {
    if (typeof result !== "string") {
      //console.log(result)
      this.addAction.emit({ result: 'ok', details: result });
    } else {
      this.addAction.emit({ result: 'dissmised', details: result });
    }
  }

  onClickSubmit(data: { [x: string]: any; }): void {
    let dataMap = new Map<string, any>();
    Object.keys(data).forEach(function(key) {
      if(key.startsWith("array:")){
        const tmp = key.split(':').pop();
        let controlName = tmp? tmp.split('[')[0] : ''
        const tmp2 = key.split('[').pop();
        let identifier = tmp2? tmp2.split(']')[0] : ''
        if(data[key]==true){
          if(!dataMap.has(controlName)){
            dataMap.set(controlName,[]);
          }
          let tmp = dataMap.get(controlName)
          tmp.push(identifier)
          dataMap.set(controlName, tmp);
        }
      } else {
        dataMap.set(key,data[key])
      }
    })
    this.go(dataMap)
    this.close();
  }

  castToInput(data: AddItemModel): AddItemInputModel {
    return data as AddItemInputModel;
  }

  castToInputNumber(data: AddItemModel): AddItemNumberModel {
    return data as AddItemNumberModel;
  }

  castToSelect(data: AddItemModel): AddItemSelect {
    return data as AddItemSelect;
  }

  castToCheckboxes(data: AddItemModel): AddItemCheckboxesModel {
    return data as AddItemCheckboxesModel;
  }

  castToCheckbox(data: AddItemModel): AddItemCheckboxModel {
    return data as AddItemCheckboxModel;
  }

  provideCheckboxText(item: AddItemModel, model: any): string {
    let tmp = this.castToCheckbox(item)?.displayProvider;
    return tmp? tmp(model) : ''
  }

  provideCheckboxesText(item: AddItemModel, model: any): string {
    let tmp = this.castToCheckboxes(item)?.displayProvider;
    return tmp? tmp(model) : ''
  }

  provideCheckboxIdentifier(item: AddItemModel, model: any): string {
    let tmp = this.castToCheckboxes(item)?.identifierProvider;
    return tmp? tmp(model) : ''
  }

  castToRadio(data: AddItemModel): AddItemRadioModel {
    return data as AddItemRadioModel;
  }

  provideRadioText(item: AddItemModel, model: any): string {
    let tmp = this.castToRadio(item)?.displayProvider;
    return tmp? tmp(model) : ''
  }

  provideRadioIdentifier(item: AddItemModel, model: any): string {
    let tmp = this.castToRadio(item)?.identifierProvider;
    return tmp? tmp(model) : ''
  }

  provideSelectText(item: AddItemModel, model: any): string {
    let tmp = this.castToSelect(item)?.displayProvider;
    return tmp? tmp(model) : ''
  }

  provideSelectIdentifier(item: AddItemModel, model: any) {
    let tmp = this.castToSelect(item)?.identifierProvider;
    return tmp? tmp(model) : ''
  }

}

export type AddOption = 'ok' | 'dissmised';
