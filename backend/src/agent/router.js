const {
    classify
}=require("./taskClassifier");


function route(task){


    return classify(task);


}


module.exports={
    route
};