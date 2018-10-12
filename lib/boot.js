
// server initialization 
module.exports = app => {
  app.listen(app.get("port"), () => {
    console.log(`Medium API - Port ${app.get("port")}`);
});
}