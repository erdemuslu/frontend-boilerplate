import $ from "jquery";
import { uniq } from "lodash";

$(document).ready(() => {

    // lodash works
    const arr = uniq([2, 1, 2]);
    console.log(arr); 

});