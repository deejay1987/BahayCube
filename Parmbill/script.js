$(document).ready(function() {

    $("body")
        .on("click", ".tiles", tileClick)
        .on("click", "#get_coordinates_btn", getCoordinatesClickBtn)
        .on("click", "#render_table_btn", renderTableBtnClick);
});

function tileClick(){
    let target_tile = $(this);
    let tile_state = target_tile.attr("data-tile_state");
    let new_tile_state = (tile_state == 1) ? 0 : 1;

    target_tile.attr("data-tile_state", new_tile_state);

    if(tile_state == 0){
        target_tile.addClass("active_tile");
    }
    else{
        target_tile.removeClass("active_tile");
    }
    getCoordinatesClickBtn();
}

function getCoordinatesClickBtn() {
    let empty_string = "[";
    /* Approach 1 is use array then .join later */
    // let empty_string_array = [];
    let tile_row_index = 1;
    let state_table_tr = $("#state_table tr");
    
    state_table_tr.each(function() {
        let state_table_row = $(this);
        let tile_tr_array = [];
        
        state_table_row.find("td").each(function() {
            let tile_td = $(this);

            tile_tr_array.push(tile_td.attr("data-tile_state"));
        });
        /* Approach 1 is use array then .join later*/
        // empty_string_array.push("\r\n" + "    [" + tile_tr_array + "]");

        /* Approach 2 is a long method */
        empty_string += "\r\n" + "    [" + tile_tr_array + "]";

        if(tile_row_index < state_table_tr.length){
            empty_string += ",";
        }

        tile_row_index++;
    });

    /* Approach 1 */
    // empty_string += empty_string_array.join(",") + "\r\n]"; 

    /* Approach 2 */
    empty_string += "\r\n]";
    $("#state_array").val(empty_string);
} 

function renderTableBtnClick(){
    let render_tile_value = $("#state_array").val();
    let tiles_string_array = render_tile_value.split("\n");
    let tiles_index_total = 0;
    let tiles_string = "";
    let tile_coordinates = [];
    let state_table = $("#state_table");

    for(let tiles_string_index = 0; tiles_string_index < tiles_string_array.length;  tiles_string_index++){
        let tile_string = tiles_string_array[tiles_string_index];

        tiles_index_total += tiles_string_index;
        tiles_string += tile_string.trim().replace(" ", "");
    }
    
    tile_coordinates = JSON.parse(tiles_string);

    /* Append/Render tile coordinates */
    state_table.html("");

    for(let render_tile_coordinates = 0; render_tile_coordinates < tile_coordinates.length; render_tile_coordinates++){
        let tiles_index = tile_coordinates[render_tile_coordinates];
        // let table_row = $("<tr></tr>");
        let table_row_clone = $(".tr_clone").clone();

        table_row_clone.removeClass("tr_clone");

        for(let tiles_property in tiles_index){
            let tile_state = tiles_index[tiles_property];
            let active_tile = (tile_state == 1) ? "active_tile" : "";
            let tile_clone = $(".tiles_clone").clone();

            tile_clone.removeClass("tiles_clone");
            tile_clone.attr("data-tile_state", tile_state);
            tile_clone.addClass(active_tile);
            
            row_data = tile_clone;
            // row_data = $("<td  class='tiles "+ active_tile +"' data-tile_state=" + tile_state + ">");

            // table_row.append(row_data);
            table_row_clone.append(row_data);
        }
        state_table.append(table_row_clone);
    }
}