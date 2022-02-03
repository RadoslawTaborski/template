import { Component, Input } from '@angular/core';
import { Subject } from "rxjs";
import { DataGridConfig, DataGridItemButtonModel, DataGridItemModel, DataGridItemImageModel, DataGridItemInputModel, DataGridItemTextModel, DataGridItemCheckboxModel, DataGridItemListModel, DataGridItemList } from '../data-grid-config';

@Component({
    selector: 'data-grid-row',
    templateUrl: './data-grid-row.component.html',
    styleUrls: ['./data-grid-row.component.scss']
})
export class DataGridRowComponent {
    @Input() model: any;
    @Input()
    index!: number;
    @Input()
    config!: DataGridConfig;
    @Input()
    itemAction!: Subject<any>;

    constructor() { }

    action(type: any, data: any) {
        this.itemAction.next({ type, data });
    }

    provideColumnClass(item: DataGridItemModel): string {
        return item.columnClass ? item.columnClass : ""
    }

    provideColumnStyle(item: DataGridItemModel): string {
        return item.columnStyle ? item.columnStyle : ""
    }

    castToButton(item: DataGridItemModel): DataGridItemButtonModel{
        return item as DataGridItemButtonModel;
    }

    castToImg(item: DataGridItemModel): DataGridItemImageModel{
        return item as DataGridItemImageModel;
    }

    castToInput(item: DataGridItemModel): DataGridItemInputModel{
        return item as DataGridItemInputModel;
    }

    castToCheckbox(item: DataGridItemModel): DataGridItemCheckboxModel{
        return item as DataGridItemCheckboxModel;
    }

    castToText(item: DataGridItemModel): DataGridItemTextModel{
        return item as DataGridItemTextModel;
    }

    castToList(item: DataGridItemModel): DataGridItemListModel{
        return item as DataGridItemListModel;
    }

    provideListObjects(item: DataGridItemModel, model: any): any[] {
        const tmp = this.castToList(item).valuesProvider;
        return tmp? tmp(model): ''
    }

    provideListItemText(item: DataGridItemModel, model: any): string {
        const tmp = this.castToList(item)?.valuesTextProvider;
        return tmp? tmp(model) : ''
    }

    provideText(item: DataGridItemModel, model: any): string {
        const tmp = this.castToText(item)?.textProvider;
        return tmp? tmp(model): ''
    }

    provideButtonInner(item: DataGridItemModel, model: any): string {
        let result = this.provideButtonIcon(item, model);
        result += this.provideButtonText(item,model);
        return result;
    }

    provideButtonText(item: DataGridItemModel, model: any): string {
        var provider = this.castToButton(item).displayProvider
        return provider ? provider(model) : ""
    }

    provideButtonIcon(item: DataGridItemModel, model: any): string {
        var provider = this.castToButton(item).iconProvider
        return provider ? provider(model) : ""
    }

    provideButtonClass(item: DataGridItemModel, model: any): string {
        var provider = this.castToButton(item).classProvider
        return provider ? provider(model) : "btn btn-secondary"
    }

    provideCheckboxValue(item: DataGridItemModel, model: any): boolean {
        const tmp = this.castToCheckbox(item).valueProvider;
        return tmp? tmp(model) : '';
    }

    provideEditableValue(item: DataGridItemModel, model: any): boolean {
        const tmp = item.editableProvider;
        return tmp? tmp(model) : ''
    }

    provideButtonStyle(item: DataGridItemModel, model: any): string {
        if(this.castToButton(item)?.styleProvider){
            const tmp = this.castToButton(item)?.styleProvider;
            return tmp? tmp(model) : tmp
        } else {
            return ""
        }
    }

    getVisibleAttributes(value: boolean){
        return this.config.data.filter(d=>d.alwaysVisible==value);
    }
}
