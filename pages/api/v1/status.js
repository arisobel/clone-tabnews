function status(request, response) {
  response.status(200).json({ chave: "são média" });
}

export default status;
