import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Tinymce = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue ?? "");
  useEffect(() => {
    setValue(initialValue ?? "");
  }, [initialValue]);

  let preProssesInnerHtml; 

  return (
    <Editor
      apiKey="mxmr841mjob4kx7baf4ej85dotmpyvf8gksgbehprnyu7nvc"
      initialValue={initialValue}
      value={value}
     
      init={{
        draggable_modal: true,
        branding: false,
        resize: 'both',
        color_picker_callback: function(callback, value) {
          callback('#FF00FF');
        },
        plugins:
          "powerpaste image custom_button hr permanentpen preview fullscreen advlist " +
          "autolink link image lists charmap print preview hr anchor pagebreak" +
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime" +
          "media nonbreaking table emoticons template help hrcustom quickbars",
          quickbars_insert_toolbar: 'quickimage quicktable | hr pagebreak',
        toolbar:
          "insertfile undo redo | styleselect | bold italic | alignleft aligncenter" + 
          "alignright alignjustify | bullist numlist outdent indent | link image | " +
          "print preview media | forecolor backcolor emoticons | save | custom_button | " +
          "fullscreen | fontsizeselect | hrcustom",
        content_style:
          ".btn {display: inline-block; line-height: 1.5;color: #212529;color: #fff;" +
          "background-color: #0d6efd;border-color: #0d6efd;text-decoration: none;" +
          "vertical-align: middle;cursor: " +
          "pointer;border: 1px solid transparent;padding: 0.375rem 0.75rem;}" +
          ".btn-primary {color: #fff;background-color: #0d6efd;border-color: #0d6efd;}" +
          ".btn-success {color: #fff;background-color: #198754;border-color: #198754;}" +
          ".btn-info {color: #000;background-color: #0dcaf0;border-color: #0dcaf0;}" +
          ".mce-content-body a:focus {cursor: pointer}" +
          ".italic {font-style: italic}" +
          ".isResizable {background: rgba(255, 0, 0, 0.2);border: 1px solid black;overflow: hidden;" +
          "resize: both;width: 160px;height: 120px;}" +
          ".btn-success {color: #000;background-color: #ffc107;border-color: #ffc107;}",
        init_instance_callback: function (editor) {
            editor.on('BeforeExecCommand', function (e) {
                if (e.command == "mcePreview") {
                    //store content prior to changing.
                    preProssesInnerHtml = editor.getContent();
                    editor.setContent(preProssesInnerHtml);
                }
            });
            editor.on("ExecCommand", function (e) {
                if (e.command == "mcePreview") {
                    //Restore initial content.
                    editor.setContent(preProssesInnerHtml);
                }
            });
        },
        link_context_toolbar: true,
        fontsize_formats:
          "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
        image_advtab: true,
        /* enable title field in the Image dialog*/
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        file_picker_types: "image",
        powerpaste_allow_local_images: true,
        powerpaste_keep_unsupported_src: true,
        object_resizing: true,
        /* and here's our custom image picker*/
        file_picker_callback: function (callback, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function (e) {
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
                      type: "sizeinput",
                      name: "height",
                      label: "Size",
                    },
                    {
                      type: "selectbox",
                      name: "button_rel",
                      label: "Text Style",
                      items: [
                        { text: "normal", value: "normal" },
                        { text: "italic", value: "italic" }
                      ],
                      flex: true
                    },
                    {
                      type: "selectbox",
                      name: "button_style",
                      label: "Shape",
                      items: [
                        { text: "rectangle", value: "rectangle" },
                        { text: "rounded rectangle", value: "roundedRec" },
                      ],
                      flex: true
                    },
                    {
                      type: "colorpicker",
                      name: "button_color",
                      label: "Color",
                      flex: true
                    }
                  ]
                },
                onSubmit: function (api) {
                  var element = document.createElement("a");

                  element.style.backgroundColor = api.getData().button_color || "#000000";
                  element.style.width = api.getData().height.width + 'px';
                  element.style.height = api.getData().height.height + "px";
                  element.style.borderRadius = (api.getData().button_style !== "rectangle") ? "0.25rem" : 0;
                  element.href = api.getData().button_href;
                  element.className = "btn " + api.getData().button_rel + " " + api.getData().button_style;
                  element.text = api.getData().button_label;
                  editor.insertContent(element.outerHTML);

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

          editor.ui.registry.addButton("hrcustom", {
            icon: "horizontal-rule",
            tooltip: "Insert horizontal rule",
            onAction: function () {
              // open window
              editor.windowManager.open({
                title: "Insert horizontal rule",
                body: {
                  type: "panel",
                  items: [{
                    type: "colorpicker",
                    name: "color",
                    label: "Color",
                    text: "#000000"
                  },
                  {
                    type: "sizeinput",
                    name: "height",
                    label: "Thickness",
                  }]
                },
                // generate and insert HTML upon submitting dialog
                onSubmit: function (e) {
                  var hr = document.createElement("hr");
                  // set color
                  hr.style.backgroundColor = e.getData().color || "#000000";
                  // set width
                  hr.style.width = e.getData().height.width + "%";
                  hr.style.height = e.getData().height.height + "px";
        
                  // set other styles
                  hr.style.border = 0;
                  hr.style.marginTop = "5px";
                  hr.style.marginBottom = "5px";
                  hr.style.overflow = "hidden";

                  // insert content when the window form is submitted
                  editor.insertContent(hr.outerHTML);
                  // close the dialog
                  e.close();
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
        }
      }}
    />
  );
};

export default Tinymce;