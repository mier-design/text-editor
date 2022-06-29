window.onbeforeunload = function() { return "Your work will be lost."; };
function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
function Export2Word(filename = 'document_mier.design') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    let spans = document.getElementsByClassName("remove_for_word");
    for (let i = 0; i < spans.length; i++) {
        spans[i].remove();
    }   
    let inputs = document.getElementsByTagName("td"); 
    for (let i = 0; i < inputs.length; i++) {
        const newItem = document.createElement('div');
        newItem.setAttribute("onclick","active(this);");
        newItem.className = 'text';
        newItem.id = inputs[i].id;
        newItem.innerHTML = inputs[i].firstChild.value;
        inputs[i].replaceChild(newItem, inputs[i].firstChild);
    }
    var html = preHtml + document.getElementById("document").innerHTML + postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}
function deleteelem() {
        if (document.getElementById("active")) {
            document.getElementById("active").remove();
        }else{
        let edits = document.getElementsByClassName("edit");
        for (var i = 0; i < edits.length; i++) {
            edits[i].remove();
        }
    }
}
    
function addTable() {
  var doc = document.getElementById("document");
  var rowsinput = document.getElementById("rowsinput");
  var columninput = document.getElementById("columninput");
  let td = doc.querySelectorAll('td').length;
  let div = doc.querySelectorAll('div').length;
  let elmntcount = doc.childElementCount--;
  let rows = "";
  for (var j = 0; j < rowsinput.value; j++) {
    id = (div) + (td) + (j);
    rows = rows + "<td id='" + id + "' style='width: auto'><input onblur='removeactive(this)' onfocus='addactive(this)' style='width: 100%;' type='text'></td>";
  }
  doc.insertAdjacentHTML("beforeend", "<table>" + rows + "</table>");
}
function deleteimage(f) {
        let deleteelem = document.getElementById(f.parentNode.id);
        deleteelem.remove();
}
function blackwhite(f) {
        let bcw = document.getElementById(f.parentNode.id).style;
        if(bcw.filter == "grayscale(100%)"){
          bcw.filter = "grayscale(0%)";
        }else{
          bcw.filter = "grayscale(100%)";
        }
}

function togglenav() {
    let checkbox = document.getElementById("showsettings");
    if (checkbox.checked) {
        document.getElementById("nav-but-wrap").style.display = "none";
    } else {
        document.getElementById("nav-but-wrap").style.display = "flex";
    }
}
var fileobj;
function upload_file(e) {
    e.preventDefault();
    fileobj = e.dataTransfer.files[0];
    ajax_file_upload(fileobj);
}
function file_explorer() {
    document.getElementById('image-file').onchange = function () {
        fileobj = document.getElementById('image-file').files[0];
        const supported_mimes = ["image/webp", "image/webm" , "image/apng", "image/avif", "image/png", "image/bmp", "image/cis-cod", "image/gif", "image/ief", "image/jpeg", "image/pipeg", "image/svg+xml", "image/tiff", "image/x-cmu-raster", "image/x-cmx", "image/x-icon", "image/x-portable-anymap", "image/x-portable-bitmap", "image/x-portable-graymap", "image/x-portable-pixmap", "image/x-rgb", "image/x-xbitmap", "image/x-xpixmap", "image/x-xwindowdump"];
        if (supported_mimes.includes(fileobj.type)) {
            ajax_file_upload(fileobj);
        } else {
            alert("no image");
        }
    };
}
function ajax_file_upload(file_obj) {
    loader = document.getElementById('loader');
    if (file_obj != undefined) {
        loader.style.display = "block";
        var form_data = new FormData();
        form_data.append('file', file_obj);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../../../../../tools/text-editor/ajax.php", true);
        xhttp.onload = function (event) {
            oOutput = document.querySelector('#document');
            let id = oOutput.childElementCount;
            if (xhttp.status == 200) {
                loader.style.display = "none";
                oOutput.insertAdjacentHTML("beforeend", escapeHtml("<div class='image' id='" + id + "'><img ontouchstart='phonedrag(this);' onmousedown='dragElement(this)' oncontextmenu='showpopup(this);' src='https://mier.design/tools/text-editor" + this.responseText + "'/></div>"));
            } else {
                oOutput.innerHTML = "Error " + xhttp.status + " occurred when trying to upload your file.";
                loader.style.display = "none";
            }
        }

        xhttp.send(form_data);
    }
}

function showpopup(f) {
    elmnt = document.getElementById(f.parentNode.id);
    if (elmnt.children.length < 2) {

        elmnt.insertAdjacentHTML("afterbegin", escapeHtml("<div class='column'><div onclick='deleteimage(this.parentNode)' class='editbutton round'><span class='material-icons remove_for_word'>delete</span></div><div onclick='sizes(this.parentNode)' class='editbutton round'><span class='material-icons remove_for_word'>category</span></div><div onclick='blackwhite(this.parentNode)' class='editbutton round'><span class='material-icons remove_for_word'>monochrome_photos</span></div></div>"));
    } else {
        elmnt.firstChild.remove();        
    }
    event.preventDefault(); 
}
let root = document.documentElement;
function isOverflown() {
    let element = document.getElementById('document');
    if (element.scrollHeight > element.innerHeight) {
        let old = element.style.height;
        document.style.minHeight = old + 23 + "cm";
    }
}
function resizeable(f) {
    element = document.getElementById(f.parentNode.lastChild.id);
    element.classList.toggle("resize");
}
  function sizes(f){
    element = document.getElementById(f.parentNode.id);
    if(element.lastChild.classList.contains("circle")){
      element.lastChild.classList.toggle("circle");
      element.lastChild.classList.toggle("triangle");
    }else{
      if(element.lastChild.classList.contains("triangle")){
         element.lastChild.classList.toggle("triangle");
         element.lastChild.classList.toggle("bevel");
      }else{
        if(element.lastChild.classList.contains("bevel")){
          element.lastChild.classList.toggle("bevel");
          element.lastChild.classList.toggle("square");
        }else{
          element.lastChild.classList.toggle("circle");
        }
      }
    }
  }

function phonedrag(elmnt) {
    elmnt2 = document.getElementById(elmnt.parentNode.id);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt2 + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt2 + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        dragMouseDown(elmnt);
    }

    function dragMouseDown(e) {
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.ontouchmove = elementDrag;

    }

    function elementDrag(e) {
        let mouse = event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        console.log(e.touches[0]);
        console.log(e.touches[0].clientX);
        let elmnt = document.getElementById(e.touches[0].target.parentNode.id);
        let filedoc = document.getElementById("document");
        console.log(elmnt);
        elmnt.style.top = (e.touches[0].clientY - filedoc.offsetTop) + "px";
        elmnt.style.left = (e.touches[0].clientX - filedoc.offsetLeft / 2 + elmnt.style.width) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}





function dragElement(elmnt) {
    elmnt = document.getElementById(elmnt.parentNode.id);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
        if (window.matchMedia("(pointer: coarse)").matches) {
            dragMouseDown;
        }
    }

    function dragMouseDown(e) {
        if (elmnt.classList.contains('resize')) return;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function styleit(f) {
    let fromstyle = document.getElementById(f.id);
    let edits = document.getElementsByClassName("edit");
    if (f.id == 'size') {
        for (var i = 0; i < edits.length; i++) {
            edits.item(i).style.fontSize = fromstyle.value + "px";
        }
    }
    if (f.id == 'color') {
        for (var i = 0; i < edits.length; i++) {
            edits.item(i).style.color = fromstyle.value;
        }
    }

    if (f.id == 'center') {
        for (var i = 0; i < edits.length; i++) {
            if (edits.item(i).style.textAlign == "center") {
                edits.item(i).style.textAlign = "right"
            }else {
                if (edits.item(i).style.textAlign == "right"){
                    edits.item(i).style.textAlign = "inherit";
                }else{
                    edits.item(i).style.textAlign = "center";
                }
            }
        }
    }
    if (f.id == 'font') {
        for (var i = 0; i < edits.length; i++) {
            edits.item(i).style.fontFamily = fromstyle.value;
        }
    }

    if (f.id == 'indent') {
        for (var i = 0; i < edits.length; i++) {
            edits.item(i).style.paddingLeft = fromstyle.value;
        }
    }
}

function stylenew(f) {
    let tostyle = document.getElementById(f.id);
    let size = document.getElementById("size");
    tostyle.style.fontSize = size.value + "px";
    let color = document.getElementById("color");
    tostyle.style.color = color.value;
}
function align2(g) {
    var padding = document.getElementById("slider").value;
    document.getElementById("slider2").value = padding;
    root.style.setProperty("--padding", padding + "%")
}
function indent(h) {
    var indent = document.getElementById("indent").value;
    root.style.setProperty("--indent", indent)
}
/*
function family() {
var family = document.getElementById("family").value;
root.style.setProperty('--family', family);
}
function serif() {
var serif = document.getElementById("serif");
if(serif.checked){
root.style.setProperty('--serif', "serif");
}else{
root.style.setProperty('--serif', "");
}
}
*/
function addend() {
    f = document.getElementById("active");
    if (document.querySelector('.resize') !== null || f) {
        return;
    }
    if (!f) {
        let magicBox = document.getElementById("document");
        let color = document.getElementById("color");
        magicBox.insertAdjacentHTML("beforeend",
            "<textarea placeholder='start typing' type='text' class='remove_for_word' id='active' style='color:" + color.value + "'></textarea>");
        var input = document.getElementById("active");
        input.focus();

        // Execute a function when the user releases a key on the keyboard
        input.addEventListener("keyup", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Cancel the default action, if needed
                event.preventDefault();
                console.log(document.getElementById("active").value);
                if(document.getElementById("active").value.trim() == ""){
                  return;
                }
                // Trigger the button element with a click
                document.getElementById("active").click();
                let e = document.getElementById('active');

                var d = docume
                nt.createElement('div');
                d.innerHTML = escapeHtml(e.value);
                const att1 = document.createAttribute("id");
                let td = magicBox.querySelectorAll('td').length;
                let table = magicBox.querySelectorAll('table').length;
                att1.value = (magicBox.childElementCount - table + td - 1);
                d.setAttributeNode(att1);
                e.parentNode.replaceChild(d, e);
                const att = document.createAttribute("onclick");
                att.value = "active(this);";
                stylenew(d);
                d.setAttributeNode(att);
                d.classList.add('text');
            }
        });
    } else {
        f.remove();
    }
}
window.addEventListener("keydown", function (event) {
    if (!document.getElementById("active")) {
      if (event.keyCode == 8) {
        deleteelem();
      }
      return;
    }
    if (event.keyCode == 27) {
        if (document.getElementById("active")) {
            document.getElementById("active").remove();
        }
        return;
    }else{ 
      if(event.keyCode == 46) {
        deleteelem();
      }else{
        if(document.getElementById("active")) {
          document.getElementById("active").focus();
        }else{
          addend();
      }
    }
  }
});
function printDiv(divName) {
    document.getElementById("footer").style.display = "none";
    document.getElementById("slidecontainer").style.display = "none";
    document.getElementById("head").style.display = "none";
    document.getElementById("navtoggle").style.display = "none";
    document.getElementById("themetoggle").style.display = "none";
    let page = document.getElementById("document");
    page.style.width = "100%";
    page.style.maxWidth = "100%";
    page.style.border = "none";
    window.print();
}
function printed() {
    document.getElementById("footer").style.display = "flex";
    document.getElementById("slidecontainer").style.display = "flex";
    document.getElementById("head").style.display = "flex";
    document.getElementById("navtoggle").style.display = "flex";
    document.getElementById("themetoggle").style.display = "flex";

    let page = document.getElementById("document");
    page.style.width = "100%";
    page.style.maxWidth = "17cm";
    page.style.border = "1px solid #8167a9"
}
var menu = document.querySelector('.nav__list-item');
function menutoggle() {
    document.querySelector('body').classList.toggle("nav-active");
}
//if mobile device
if ('ontouchstart' in document.documentElement) {
    var mobile = true;

    var input = document.getElementById("active");
    document.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
        }
    })
};



function submitdoc() {
      // submitting the form
      document.getElementById("docform").submit();
  };
function save() {
    let idk1 = document.getElementById("saved").style.display = "none";
    let idk2 = document.getElementById("form");
    let idk3 = document.getElementById("saveinput");
    document.head.insertAdjacentHTML("beforeend", '<meta name="robots" content="noindex">');
    idk3.innerHTML = document.head.innerHTML + document.body.innerHTML;
    setTimeout(() => {
        idk2.submit();
    }, 1000);
}
function active(f) {
    if(!window.getSelection() || window.getSelection() == ""){
      var tostyle = document.getElementById(f.id);
      tostyle.classList.toggle("edit");
    }else{
      window.getSelection().anchorNode.textContent = window.getSelection().toString();
   }
}
function addactive(f) {
    console.log(f.parentNode);
    var tostyle = document.getElementById(f.parentNode.id);
    tostyle.firstChild.setAttribute("id", "active");
}
function removeactive(f) {
    console.log(f.parentNode);
    var tostyle = document.getElementById(f.parentNode.id);
    tostyle.firstChild.removeAttribute("id");
    if(tostyle.firstChild.value != ""){

    }
}
