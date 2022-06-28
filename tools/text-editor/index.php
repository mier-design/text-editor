<!DOCTYPE html>
<html>
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script>
	$(function(){
	  var includes = $('[data-include]');
	  jQuery.each(includes, function(){
		var file = '' + $(this).data('include') + '.html';
		$(this).load(file);
	  });
	});
  </script>
  <meta name="robots" content="max-image-preview:standard">
  <link rel="manifest" href="../../../../../../../manifest.json" />
  <meta name="theme-color" content="#6F1CC5">
  <meta name="apple-mobile-web-app-status-bar" content="#6F1CC5" />
  <link rel="apple-touch-icon" href="../../../../../../../favicon.ico" />
  <link rel="stylesheet" id="fonts" type="text/css" href="../../../../../assets/styles/fonts.css">
  <meta name="description" content="A text editor like word that actually works like you want">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons">
  <link rel="stylesheet" href="https://mier.design/assets/styles/style.css">
  <link rel="stylesheet" href="https://mier.design/tools/text-editor/text-editor.css">
  <!-- Primary Meta Tags -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="mier.design ~ text-editor">
  <meta property="og:description" content="text editor">
  <meta name="image" property="og:image" content="https://mier.design/assets/images/text-icon.png">

  <title>Mier.design ~ text-editor</title>
  <script src="https://mier.design/assets/script/script.js"></script>
  <script src="https://mier.design/tools/text-editor/script.js"></script>
</head>
<body id="body" onmouseenter="printed()" onafterprint="printed()">
  <?php require_once("../../header.html"); ?>
  <div id="loader" class="loader">
    <div class="container">
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
    </div>
  </div>
    <?php require_once("./wordfunctions.html"); ?>
    <div id="docparent">
      <div oninput="align2();" id="slidecontainer" class="slidecontainer"><input type="range" min="0" max="49" value="2" aria-label="slide" class="slider" id="slider"><input type="range" min="0" max="49" value="2" aria-label="slide other side" class="slider rotated" id="slider2">
      </div>
      <div ondrop="upload_file(event)" ondragover="return false" id="document" ondblclick="addend(this);">
        <?php
                if (isset($_FILES['doc']['tmp_name'])) {
                    $doc_file = file_get_contents( $_FILES['doc']['tmp_name']);
                    $doc_file = preg_replace('/<title[^>]*>([\s\S]*?)<\/title[^>]*>/', '', $doc_file);
                    $doc_file = preg_replace('/<meta([\s\S]*?)[^>]*>/', '', $doc_file);
                    echo "<div id='0'>".$doc_file."</div>";
                }     
        ?>
      </div>
    </div>
    <div id="footer" class="foot settings">
      <div style="display:none;" id="saved">
        <h1><span class="material-icons">save</span>saved succesfully as </h1>
      </div>
      <form name="form" id="form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
        <textarea id="saveinput" name="save" style="display:none;"></textarea>
      </form>
    </div>
  </div>
  <form>
    <input type="text" id="x"><br />
    <input type="text" id="y"><br />
  </form>
  <?php if(isset($_POST['save'])){
            $time = time();
            $content = $_POST["save"];
            mkdir('./save/' . md5($_SERVER["REMOTE_ADDR"]) . '/' . $time , 0777, true);
            $path = "save/" . md5($_SERVER["REMOTE_ADDR"]) . "/" . $time . "/index.php";
            $name = "open";
            $write = fopen("$path", "w");
            fwrite($write, $content);
            fclose($write);
            echo "<script>let show = document.getElementById('saved');    
                          show.innerHTML = '<a target=_self href=https://mier.design/tools/text-editor/". $path ." id=". "savelink" ."><span class=material-icons>edit_note</span>". $name ."</a>';
                          show.style.display = 'block';
                          show.style.zIndex = '5';
            </script>";
    } ?>
  <script type="text/javascript">

    if ('serviceWorker' in navigator) {
      console.log("Will the service worker register?");
      navigator.serviceWorker.register('../../../../../service-worker.js')
        .then(function (reg) {
        }).catch(function (err) {
          console.log("This happened:", err)
        });
    }

    let deferredPrompt;
    const addBtn = document.querySelector('.add-button');
    addBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block';

      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
      });
    });
  </script>
</body>
</html>