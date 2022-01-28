import { useRef, useState, useEffect } from "react";

import { Editor } from "@tinymce/tinymce-react";
import "./App.css";

const Tinymce = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue ?? "");
  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  return (
    <Editor
      apiKey="mxmr841mjob4kx7baf4ej85dotmpyvf8gksgbehprnyu7nvc"
      initialValue={initialValue}
      value={value}
      //inline
      init={{
        //menubar: false,
        draggable_modal: true,
        plugins:
          "powerpaste image custom_button hr permanentpen preview fullscreen advlist autolink link image lists charmap print preview hr anchor pagebreak" +
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking" +
          "table emoticons template help",
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons | save | custom_button | fullscreen | fontsizeselect",
        content_style:
          "a.btn {display: inline-block; line-height: 1.5;color: #212529;color: #fff;" +
          "background-color: #0d6efd;border-color: #0d6efd;text-decoration: none;vertical-align: middle;cursor: " +
          "pointer;border: 1px solid transparent;padding: 0.375rem 0.75rem;border-radius: 0.25rem;}" +
          ".btn-primary {color: #fff;background-color: #0d6efd;border-color: #0d6efd;}" +
          ".btn-success {color: #fff;background-color: #198754;border-color: #198754;}" +
          ".btn-info {color: #000;background-color: #0dcaf0;border-color: #0dcaf0;}" +
          ".isResizable {background: rgba(255, 0, 0, 0.2);border: 1px solid black;overflow: hidden;resize: both;width: 160px;height: 120px;}" +
          ".btn-success {color: #000;background-color: #ffc107;border-color: #ffc107;}",
        fontsize_formats:
          "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
        image_advtab: true,
        /* enable title field in the Image dialog*/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        /*
URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
images_upload_url: 'postAcceptor.php',
here we add custom filepicker only to Image dialog
*/
        file_picker_types: "image",
        powerpaste_allow_local_images: true,
        powerpaste_keep_unsupported_src: true,
        object_resizing: true,
        /* and here's our custom image picker*/
        file_picker_callback: function (callback, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          /*
Note: In modern browsers input[type="file"] is functional without
even adding it to the DOM, but that might not be the case in some older
or quirky browsers like IE, so you might want to add it to the DOM
just in case, and visually hide it. And do not forget do remove it
once you do not need it anymore.
*/

          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function (e) {
              console.log("name", e.target.result);
              callback(e.target.result, {
                alt: file.name
              });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        setup: (editor) => {
          editor.on("init", function (e) {
            editor.execCommand("mceFullScreen");
          });

          editor.ui.registry.addButton("custom_button", {
            icon: "btn",
            tooltip: "Button",
            text: "Add Button",
            onAction: function () {
              // Open a Dialog

              editor.windowManager.open({
                title: "Add custom button",
                body: {
                  type: "panel",
                  items: [
                    {
                      type: "input",
                      name: "button_label",
                      label: "Button label",
                      flex: true
                    },
                    {
                      type: "input",
                      name: "button_href",
                      label: "Button href",
                      flex: true
                    },
                    {
                      type: "selectbox",
                      name: "button_target",
                      label: "Target",
                      items: [
                        { text: "None", value: "" },
                        { text: "New window", value: "_blank" },
                        { text: "Self", value: "_self" },
                        { text: "Parent", value: "_parent" }
                      ],
                      flex: true
                    },
                    {
                      type: "selectbox",
                      name: "button_rel",
                      label: "Rel",
                      items: [
                        { text: "No value", value: "" },
                        { text: "Alternate", value: "alternate" },
                        { text: "Help", value: "help" },
                        { text: "Manifest", value: "manifest" },
                        { text: "No follow", value: "nofollow" },
                        { text: "No opener", value: "noopener" },
                        { text: "No referrer", value: "noreferrer" },
                        { text: "Opener", value: "opener" }
                      ],
                      flex: true
                    },
                    {
                      type: "selectbox",
                      name: "button_style",
                      label: "Style",
                      items: [
                        { text: "Success", value: "success" },
                        { text: "Info", value: "info" },
                        { text: "Warning", value: "warning" },
                        { text: "Error", value: "error" }
                      ],
                      flex: true
                    }
                  ]
                },
                onSubmit: function (api) {
                  console.log(
                    api.getData().button_href +
                      "---" +
                      api.getData().button_style
                  );
                  var html =
                    '<button href="' +
                    api.getData().button_href +
                    '" class="isResizable btn btn-' +
                    api.getData().button_style +
                    '" rel="' +
                    api.getData().button_rel +
                    '" target="' +
                    api.getData().button_target +
                    '">' +
                    api.getData().button_label +
                    "</button>";
                  // insert markup
                  editor.insertContent(html);

                  // close the dialog
                  api.close();
                },
                buttons: [
                  {
                    text: "Close",
                    type: "cancel",
                    onclick: "close"
                  },
                  {
                    text: "Insert",
                    type: "submit",
                    primary: true,
                    enabled: false
                  }
                ]
              });
            }
          });

          // editor.ui.registry.addContextToolbar('imagealignment', {
          // predicate: function (node) {
          //   return node.nodeName.toLowerCase() === 'img'
          // },
          // items: 'alignleft aligncenter alignright',
          // position: 'node',
          // scope: 'node'
          // });

          editor.ui.registry.addContextToolbar("textselection", {
            predicate: function (node) {
              return !editor.selection.isCollapsed();
            },
            items: "bold italic | blockquote",
            position: "selection",
            scope: "node"
          });
        }
      }}
      //onEditorChange={(newValue, editor) => { console.log(newValue + "--nv");setValue(newValue)}}
      onDrag={(event, editor) => {
        console.log(editor + "--onDrag---" + event);
      }}
      onDragDrop={(event, editor) => {
        console.log(editor + "--onDragDrop---" + event);
      }}
      onDragEnd={(event, editor) => {
        console.log(editor + "--onDragEnd---" + event);
      }}
      onDragGesture={(event, editor) => {
        console.log(editor + "--onDragGesture---" + event);
      }}
      onDragOver={(event, editor) => {
        console.log(editor + "--onDragOver---" + event);
      }}
      onDrop={(event, editor) => {
        console.log(editor.getBody().dir + "--onDrop---" + event.target.value);
      }}
    />
  );
};

export default Tinymce;