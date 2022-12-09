import React from "react";
import { CKEditor } from "ckeditor4-react";

function Editor({value, onChange }) {
 
    return (
      <>
        <CKEditor
          initData={value}
          onChange={onChange}
          config={{
            uiColor: "#349520",
            language: "th",
            // extraPlugins: "uploadimage",
            // filebrowserUploadMethod: "form",
            // filebrowserUploadUrl: ("/uploader/upload"),
            // filebrowserBrowseUrl: '/addgallery',
            // toolbar: [
            // ],
            extraPlugins: "easyimage,autogrow,emoji",
            // removePlugins: 'image',
          }}
        />
      </>
    );
}

export default Editor;
