var context = {};

(function () {
    var $result = document.getElementById("result");

    function update () {
        var result = null;
        var input = editor.getValue();

        try {
            result = Mustache.render(input, context);
            $result.parentNode.style.background = "#27ae60";
        } catch (e) {
            result = e.stack;
            $result.parentNode.style.background = "#c0392b";
        }

        $result.innerHTML = result;
    }

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/html");
    editor.on("change", update);
    editor.setValue(`<h1>{{ title }}</h1>

<ul>
    {{#items}}
    <li>{{name}}</l1>
    {{/items}}
</ul>

<img src="{{image}}" />`, -1);
    editor.focus();

    var json = ace.edit("json");
    json.setTheme("ace/theme/github");
    json.getSession().setMode("ace/mode/json");
    json.on("change", function() {
        var input = json.getValue();
        try {
            context = JSON.parse(input);
            update();
            $result.parentNode.style.background = "#27ae60";
        } catch (e) {
            result = e.stack;
            $result.parentNode.style.background = "#c0392b";
        }
    });
    json.setValue(
`{
    "title": "test",
    "image": "https://media.tenor.com/images/c7eac59fb909510e714e85de277ca81a/tenor.gif",
    "items": [
        {"name": "Hi"},
        {"name": "It"},
        {"name": "Really"},
        {"name": "Works"}
    ]
}`, -1);
    json.focus();

})();
