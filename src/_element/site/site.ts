import Element from "../element"
import PanelManager from "../panelManager/panelManager"
import InformPanel from "../_panel/informPanel/informPanel"
import EduPanel from "../_panel/eduPanel/eduPanel"
import LoginPanel from "../_panel/loginPanel/loginPanel"






export default class Site extends Element {
  private manager = new PanelManager()
  constructor() {
    super()

    this.apd(this.manager)

    //this.manager.setPanel({left: new InformPanel("LabAuth", "A teacher may log in with his edu.card to start the session."), right: new EduPanel("teacher")})
    this.manager.setPanel({left: new LoginPanel(), right: new EduPanel("teacher")})
    
  }

  stl() {
    return require("./site.css").toString()
  }
  pug() {
    return require("./site.pug").default
  }
}

window.customElements.define('c-site', Site);