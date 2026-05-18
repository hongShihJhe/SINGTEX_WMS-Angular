import { IFormOperateState } from "../@interfaces/IFormOperateState"

export class FormOpFailState implements IFormOperateState{
    getListCallback: Function = () => {}
    addCallback: Function = () => {}
    updateCallback: Function = () => {}
    deleteCallback: Function = () => {}
}