import { IFormOperateState } from "../@interfaces/IFormOperateState"

export class FormOpSuccState implements IFormOperateState {
    getListCallback: Function = () => {}
    addCallback: Function = () => {}
    updateCallback: Function = () => {}
    deleteCallback: Function = () => {}
}