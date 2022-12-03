import React from "react";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">
                &copy; <a href="#">Lucky Number</a>, All Right Reserved.
              </div>
              <div className="col-12 col-sm-6 text-center text-sm-end">
                Designed By <a href="https://htmlcodex.com">MPT Group</a>{' '}{' '}
                Distributed By: <a href="https://themewagon.com" target="_blank">ThemeMPT</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
