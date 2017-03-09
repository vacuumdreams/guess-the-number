import { serviceStorage } from "../../app/services"
import uuid from "uuid"

export default ({
  user: serviceStorage.getCreate("uid", uuid.v4()),
  guesses: serviceStorage.getCreate("guesses", 0),
  status: "",
  value: 20,
  message: serviceStorage.get("message") || "",
  messageType: serviceStorage.get("messageType") || "",
})
