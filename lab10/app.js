class Dog {
    constructor(id, title, sex, age, description, dogImage) {
        this.id = id;
        this.title = title;
        this.sex = sex;
        this.age = age;
        this.description = description;
        this.dogImage = dogImage;
    }
}

function openModal(dog) {
    let modal = $("#modal");
    let dogImage = $("#dog-img");
    let dogName = $("#dog-name");
    let dogSex = $("#dog-sex");
    let dogAge = $("#dog-age");
    let dogPersonality = $("#dog-personality");

    dogImage.attr("src", "https://usersdogs.dmytrominochkin.cloud" + dog.dogImage);
    dogName.text(dog.title);
    dogSex.text(dog.sex);
    dogAge.text(dog.age);
    dogPersonality.text(dog.description);

    modal.css("display", "block");
}

function closeModal() {
    let modal = $("#modal");
    modal.css("display", "none");
}

// --------------

const getDogs = async function () {
    const res = await fetch("https://usersdogs.dmytrominochkin.cloud/dogs");
    if (!res.ok) throw new Error("Не побачити собачок :(");
    return await res.json();
};

$(document).ready(function () {
    let mainContainer = $("#main");

    getDogs()
        .then((data) => {
            data.forEach(function (item) {
                let dogContainer = $("<div>").addClass("dog-container").css("margin-top", "1em");

                dogContainer.click(function () {
                    openModal(item);
                });

                let imgContainer = $("<div>").addClass("img");

                let img = $("<img>").attr("src", "https://usersdogs.dmytrominochkin.cloud" + item.dogImage).addClass("small-img-size");

                imgContainer.append(img);

                let shortInfoContainer = $("<div>").addClass("short-info");

                let title = $("<div>").addClass("name").text(item.title);

                let sex = $("<div>").addClass("sex").text(item.sex);

                shortInfoContainer.append(title);
                shortInfoContainer.append(sex);

                dogContainer.append(imgContainer);
                dogContainer.append(shortInfoContainer);

                mainContainer.append(dogContainer);
            });
        })
        .catch((error) => {
            console.error("Ну нема собачок(");
        });
});