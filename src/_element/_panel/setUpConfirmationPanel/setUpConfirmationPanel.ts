import Panel from "../panel"
import Button from "./../../_button/_rippleButton/blockButton/blockButton"
import PanelManager from "../../panelManager/panelManager"
import delay from "delay"
import { ElementList } from "extended-dom"



export default class SetUpConfirmationPanel extends Panel {
  public preferedWidth = 20

  
  private subjectElem = this.q("subject-text")
  private facultyElem = this.q("faculty-text")
  private hoursElem = this.q("hours-text")

  private confirmButton: Button
  private abortButton: Button
  constructor(manager: PanelManager) {
    super()


    this.abortButton = new Button("Abort").addClass("abort")
    this.confirmButton = new Button("Sure").addClass("confirm")

    this.abortButton.addActivationCallback(() => {
      manager.panelIndex.info.heading("LabAuth")
      manager.panelIndex.info.content("A teacher may log in with his edu.card to start the session.")
      manager.panelIndex.edu.expectedTeacher()
      manager.setPanel("info", "left")
      manager.setPanel("edu", "right")
    })

    this.confirmButton.addActivationCallback(() => {
      manager.panelIndex.info.heading("LabAuth")
      manager.panelIndex.info.content("You may sigh into <text-hightlight>Medt</text-hightlight> here. To sign out register your card again.")
      manager.panelIndex.edu.expectedStudent()
      manager.setPanel("info", "left")
      manager.setPanel("edu", "right")
    })

    this.apd(this.abortButton, this.confirmButton)


    this.updateButtonsMaybe()
  }
  private subjectOK = false
  subject(s: string) {
    this.subjectOK = !!s
    this.subjectElem.text(s || "no Subject")
    this.updateButtonsMaybe()
  }
  private facultyOK = false
  faculty(s: string) {
    this.facultyOK = !!s
    this.facultyElem.text(s || "no faculty")
    this.updateButtonsMaybe()
  }
  private hoursOK = false
  hours(s: string) {
    this.hoursOK = !!s
    this.hoursElem.text(s || "0")
    this.updateButtonsMaybe()
  }
  private updateButtonsMaybe() {
    if (this.subjectOK && this.facultyOK && this.hoursOK) this.confirmButton.enable()
    else this.confirmButton.disable()
  }
  async hightlightConfirmButton() {
    this.confirmButton.focus()
    await this.confirmButton.anim({background: "rgba(0,0,0,0.15)"}, 300)
    await this.confirmButton.anim({background: "rgba(0,0,0,0)"}, 300)
  }

  stl() {
    return require("./setUpConfirmationPanel.css").toString()
  }
  pug() {
    return require("./setUpConfirmationPanel.pug").default
  }
}

//@ts-ignore
window.customElements.define('c-setup-confirmation-panel', SetUpConfirmationPanel);