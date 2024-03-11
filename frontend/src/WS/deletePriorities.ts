function deletePriorities(sendJsonMessage: Function) {
  sendJsonMessage({
    messagetyp: "deletePriority",
  });
}

export default deletePriorities;
