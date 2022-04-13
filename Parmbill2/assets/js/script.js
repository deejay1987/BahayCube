let tile_coordinates_array = [
                                [
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    }
                                ],
                                [
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    }
                                ],
                                 [
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    }
                                ],
                                [
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop         : null
                                    },
                                    {    
                                        tile_state_id   : 0,
                                        tile_crop       : null
                                    }
                                ]
                            ];

let tile_obj = {    
                    tile_state_id   : 0,
                    tile_crop       : null
                }

const CROP_ARRAY = [
                        {
                            type: "potato",
                            harvest_time: 60,
                            earnings: 10
                        },
                        {
                            type: "onion",
                            harvest_time: 80,
                            earnings: 15
                        },
                        {
                            type: "carrot",
                            harvest_time: 120,
                            earnings: 25
                        },
                        {
                            type: "corn",
                            harvest_time: 180,
                            earnings: 35
                        }
                    ];

const TILE_STATES = {
                        empty: 0,
                        tilled: 1,
                        has_plant: 2,
                        for_harvesting: 3
                    }

$(document).ready(function() {

    $("body")
        .on("dblclick", ".plant_tile", tileClick)
        .on("click", ".tiles", tileClick)
        .on("click", ".till_btn", tillBtnClick)
        .on("click", ".plant_btn_modal", plantBtnModalClick) /* Show modal */
        .on("submit", "#crops_form", cropsFormSubmit) /* To plant */
        .on("click", ".modal_remove_btn", modalRemoveBtnClick) /* Remove button inside modal */
        .on("click", ".harvest_btn_modal", harvestBtnModalClick) /* Harvest/remove plant */
        .on("click", ".remove_btn_modal", function(){ /* Show modal after clicking remove popover */
            $("#remove_modal").modal("show");
            $(".popover").hide();
        })
        .on("click", ".cancel_btn", function(){
            $("#remove_modal").modal("hide");
        })
        .on("click", ".modal_cancel_btn", function(){
            $("#plant_modal").modal("hide");
        })
       
        // .on("click", "#get_coordinates_btn", getCoordinatesClickBtn)
        // .on("click", "#render_table_btn", renderTableBtnClick);


        /* From bootstrap - Initialize all popovers on a page would be to select them by their data-bs-toggle attribute */
        // let popover_trigger_list = [].slice.call($('[data-bs-toggle="popover"]'))
        // let popover_list = popover_trigger_list.map(function (popover_trigger_el) {
        //     console.log(popover_trigger_el);

        //     return new bootstrap.Popover(popover_trigger_el, {
        //         placement   : "bottom",
        //         trigger     : "click",
        //         html        : true,
        //         content     : "<button type='button' class='till_btn'>Till</button>"
        //     })
        // });

        renderTableBtnClick();
});

function tileClick(event){
    let target_tile = $(this);
    let target_tile_id = target_tile.attr("id");
        target_tile_id = target_tile_id.replace("tile_", "");
    let tile_coordinates = target_tile_id.split("_");
    let data_tile_y = tile_coordinates[1];
    let data_tile_x = tile_coordinates[0];
    let tile_obj = tile_coordinates_array[ data_tile_y ] [ data_tile_x ];

    $(".popover").popover("dispose");

    setTimeout(function(){
        // console.log(tile_coordinates_array[ data_tile_y ] [ data_tile_x ]);
        let popover_btn = "";

        /* Change popover button depends on tile state */
        if(tile_obj.tile_state_id == TILE_STATES.empty){
            popover_btn ="<button type='button' class='till_btn' data-tile_x="+ data_tile_x +" data-tile_y="+ data_tile_y +">Till</button>";
        }
        else if(tile_obj.tile_state_id == TILE_STATES.tilled){
            popover_btn = "<button type='button' class='plant_btn_modal' data-tile_x="+ data_tile_x +" data-tile_y="+ data_tile_y +">Plant</button>";
        }
        else if(tile_obj.tile_state_id == TILE_STATES.has_plant){
        // tile_coordinates_array[ data_tile_y ] [ data_tile_x ] = TILE_STATES.has_plant
            if(event.type == "dblclick"){
                plantTileDblClick(data_tile_y, data_tile_x);
            }
            else{
                popover_btn = "<button type='button' class='remove_btn_modal' data-tile_x="+ data_tile_x +" data-tile_y="+ data_tile_y +">Remove</button>";
            };
        }
        else if(tile_obj.tile_state_id == TILE_STATES.for_harvesting){
            popover_btn = "<button type='button' class='harvest_btn_modal' data-tile_x="+ data_tile_x +" data-tile_y="+ data_tile_y +">Harvest</button>" + 
                            "<button type='button' class='remove_btn_modal' data-tile_x="+ data_tile_x +" data-tile_y="+ data_tile_y +">Remove</button></div>";
        }
        else{
            popover_btn = "error";
        }

        target_tile.popover({
            placement   : "bottom",
            html        : true,
            content     : popover_btn
        }).popover("show");

    }, 148)
}

function tillBtnClick(){
    // assign till btn into a variable
    let till_btn = $(this);
    // get tile x and tile y from till_btn  
    let data_tile_x = till_btn.attr("data-tile_x");
    let data_tile_y = till_btn.attr("data-tile_y");
    let tile_obj = tile_coordinates_array[ data_tile_y ] [ data_tile_x ];
    // let tile_state = tile_coordinates_array[ data_tile_y ] [ data_tile_x ];

    // console.log(tile_coordinates_array[ tile_coordinates[1] ][ tile_coordinates[0] ]);
    // console.log(tile_coordinates_array[ data_tile_y ] [ data_tile_x ]);
    // change value of tile coordinates array [tile_y] [tile_x] = 1

    // if(tile_state == TILE_STATES.empty){
    //     tile_coordinates_array[ data_tile_y ] [ data_tile_x ] = TILE_STATES.tilled
    // }
    
    if(tile_obj.tile_state_id == TILE_STATES.empty){
        tile_coordinates_array[ data_tile_y ] [ data_tile_x ].tile_state_id = TILE_STATES.tilled
    }

    renderTableBtnClick();
    $(".popover").hide();
}

function plantBtnModalClick(){
    let plant_btn = $(this);
    let data_tile_x = plant_btn.attr("data-tile_x");
    let data_tile_y = plant_btn.attr("data-tile_y");
    let tile_obj = tile_coordinates_array[ data_tile_y ] [ data_tile_x ];

    if(tile_obj.tile_state_id == TILE_STATES.tilled){
        $("#plant_modal").modal("show");
    }

    $("#image_src").val($(".plant").find("img").attr("alt"));
    $(".popover").hide();
    renderTableBtnClick();
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
    let tile_coordinates = [];
    let state_table = $("#state_table");

    tile_coordinates = tile_coordinates_array;

    /* Append/Render tile coordinates */
    state_table.html("");

    let tile_colors_array = ["", "tilled_tile", "plant_tile", "harvesting_tile"];

    for(let render_tile_coordinates = 0; render_tile_coordinates < tile_coordinates.length; render_tile_coordinates++){
        let tiles_index = tile_coordinates[render_tile_coordinates];
        // let table_row = $("<tr></tr>");  
        let table_row_clone = $(".tr_clone").clone();

        table_row_clone.removeClass("tr_clone");

        for(let tiles_property in tiles_index){
            // let tile_state = tiles_index[tiles_property];
            let tile_obj = tiles_index[tiles_property];
            // let active_tile = (tile_state == ) ? "active_tile" : "";
            let tile_clone = $(".tiles_clone").clone();

            tile_clone.removeClass("tiles_clone");
            tile_clone.attr("data-tile_state", tile_obj.tile_state_id);
            // tile_clone.attr("data-tile_state", tile_state);
            tile_clone.attr("id", "tile_" + tiles_property + "_" + render_tile_coordinates);
            tile_clone.addClass(tile_colors_array[tile_obj.tile_state_id]);
            // tile_clone.addClass(tile_colors_array[tile_state]);
            let crop_countdown_timer = tile_clone.find(".crop_countdown_timer");

            if(tile_obj.tile_crop != null){
                tile_clone.addClass(tile_obj.tile_crop.type);
                
                setTimeout(function(){
                    let harvest_time = tile_obj.tile_crop.harvest_time;
                    crop_countdown_timer.text(harvest_time);
                    
                    let interval = setInterval(function() {
                        crop_countdown_timer.text(harvest_time);
                        harvest_time--;

                        if (harvest_time <= 0) {
                            crop_countdown_timer.text("$" + tile_obj.tile_crop.earnings)
                            /* NOTE: will change tile_state for harvesting */
                            clearInterval(interval);
                            return;
                        }
                        else{
                            crop_countdown_timer.text(harvest_time + "s");
                        }
                    }, 1000);
                });
            }
            

            row_data = tile_clone;
            // row_data = $("<td  class='tiles "+ active_tile +"' data-tile_state=" + tile_state + ">");

            // table_row.append(row_data);
            table_row_clone.append(row_data);
        }
        state_table.append(table_row_clone);
    }
}

function plantTileDblClick(y_coordinates, x_coordinates){

    $(".popover").popover("dispose");

    tile_coordinates_array[ y_coordinates ] [ x_coordinates ].tile_state_id = TILE_STATES.for_harvesting
   
    renderTableBtnClick();
    $(".popover").hide();
        return;
    }

/* This will go back to empty tile after clicking the remove button inside the modal */
function modalRemoveBtnClick(){
    let remove_btn_modal =  $(".remove_btn_modal");
    let data_tile_x = remove_btn_modal.attr("data-tile_x");
    let data_tile_y = remove_btn_modal.attr("data-tile_y");

    tile_coordinates_array[ data_tile_y ] [ data_tile_x ].tile_state_id = TILE_STATES.empty;
    tile_coordinates_array[ data_tile_y ] [ data_tile_x ].tile_crop = null;
    
    renderTableBtnClick();
    $("#remove_modal").modal("hide");
}

/* This will change the tile state and append crop to the tile after clicking the plant button inside the modal*/
function cropsFormSubmit(e){
    e.preventDefault();
    let plant_btn_modal = $(".plant_btn_modal");
    let data_tile_x = plant_btn_modal.attr("data-tile_x");
    let data_tile_y = plant_btn_modal.attr("data-tile_y");
    let tile_obj = tile_coordinates_array[ data_tile_y ][ data_tile_x ];
    let crops_form = $("#crops_form").serializeArray();
    let selected_crop_id = crops_form[0].value;

    if(tile_obj.tile_state_id == TILE_STATES.tilled){
        tile_coordinates_array[ data_tile_y ] [ data_tile_x ].tile_state_id = TILE_STATES.has_plant;
        tile_coordinates_array[ data_tile_y ] [ data_tile_x ].tile_crop = CROP_ARRAY[selected_crop_id];
    }

    renderTableBtnClick();
    $("#plant_modal").modal("hide");
    return;
}

/* Harvest/remove plant and go back to empty tile state */
function harvestBtnModalClick(){
    let harvest_btn_modal =  $(".harvest_btn_modal");
    let data_tile_x = harvest_btn_modal.attr("data-tile_x");
    let data_tile_y = harvest_btn_modal.attr("data-tile_y");
    let tile_state = tile_coordinates_array[ data_tile_y ] [ data_tile_x ];

    if(tile_state.tile_state_id == TILE_STATES.for_harvesting){
        tile_coordinates_array[ data_tile_y ] [ data_tile_x ].tile_state_id = TILE_STATES.empty
    }

    renderTableBtnClick();
    $(".popover").hide();
}