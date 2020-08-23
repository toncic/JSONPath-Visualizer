import { observable, action, computed } from 'mobx';
import exampleJson from '../exampleJson.json';


class ApplicationState {

    @observable
    jsonObjectToParse: Object = exampleJson;

    @observable
    fullJsonObject: Object = exampleJson;

    @observable
    isFiltering: boolean = false;

    @observable
    jsonPathExpression: string = '';

    @action
    setJsonObjectToParse(newJsonObject: Object): void {
        this.jsonObjectToParse = newJsonObject;
    }

    @action
    setFullJsonObject(newJsonObject: Object): void {
        this.fullJsonObject = newJsonObject;
    }

    @action
    setIsFiltering(isFiltering: boolean): void {
        this.isFiltering = isFiltering;
    }

    @action
    setJsonPathExpression(expression: string): void {
        this.jsonPathExpression = expression;
    }

    @action
    resetJsonPathExpresion(): void {
        this.jsonPathExpression = '';
    }
}

export const AppState = new ApplicationState();