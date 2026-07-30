function classify(task){


    const text =
    String(task)
    .toLowerCase();



    if(
        text.includes("проверь") ||
        text.includes("ошибка") ||
        text.includes("selfcheck")
    ){

        return "developer";

    }



    if(
        text.includes("создай") ||
        text.includes("напиши") ||
        text.includes("код")
    ){

        return "builder";

    }



    return "chat";


}


module.exports={
    classify
};