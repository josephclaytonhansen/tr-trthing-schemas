/* ---------------------- Where 0 is the active square, --------------------- */
/* ---------------------- square numbering on the grid ---------------------- */
/* ----------------- spirals clockwise out from the center: ----------------- */
/* ------------------------------ ------------- ----------------------------- */
/* ------------------------------ | 2 | 3 | 4 | ----------------------------- */
/* ------------------------------ ------------- ----------------------------- */
/* ------------------------------ | 1 | 0 | 5 | ----------------------------- */
/* ------------------------------ ------------- ----------------------------- */
/* ------------------------------ | 8 | 7 | 6 | ----------------------------- */
/* ------------------------------ ------------- ----------------------------- */

/* ---------- If n=3 instead of 1, the spiral is counted like this: --------- */
/* -------------------------- ----------------------------- ------------------------- */
/* -------------------------- | 30| 31| 32| 33| 34| 35| 36| ------------------------- */
/* -------------------------- ----------------------------- ------------------------- */
/* -------------------------- | 29| 12| 13| 14| 15| 16| 37| ------------------------- */
/* -------------------------- ----------------------------- ------------------------- */
/* -------------------------- | 28| 11| 2 | 3 | 4 | 17| 38| ------------------------- */
/* -------------------------- ----------------------------- ------------------------- */
/* -------------------------- | 27| 10| 1 | 0 | 5 | 18| 39| ------------------------- */
/* -------------------------- ----------------------------- ------------------------- */
/* -------------------------- | 26| 9 | 8 | 7 | 6 | 19| 40| ------------------------- */
/* -------------------------- ----------------------------- ------------------------- */
/* -------------------------- | 25| 24| 23| 22| 21| 20| 41| ------------------------- */
/* -------------------------- ----------------------------- ------------------------- */
/* -------------------------- | 48| 47| 46| 45| 44| 43| 42| ------------------------- */
/* -------------------------- ----------------------------- ------------------------- */

/* ----- This is admittedly somewhat clunky, and generally, this system ----- */
/* ------- is of limited scope. The main use is for batallions, which ------- */
/* ------- affect many specific squares. Long-distance attacks can use ------ */
/* ------- a simple Manhattan radius to find all squares within range. ------ */
/* ---------- The maximum range of a battalion is 3, so the spiral ---------- */
/* --------------------- needs to be numbered up to n=3. -------------------- */
/* ------------------ For simplicity, the spiral is stored ------------------ */
/* -------------------------- as an array of rows. -------------------------- */

const squares = [
    [30, 31, 32, 33, 34, 35, 36],
    [29, 12, 13, 14, 15, 16, 37],
    [28, 11, 2, 3, 4, 17, 38],
    [27, 10, 1, 0, 5, 18, 39],
    [26, 9, 8, 7, 6, 19, 40],
    [25, 24, 23, 22, 21, 20, 41],
    [48, 47, 46, 45, 44, 43, 42]
]

/* -------- This is a helper function for making sense of the spiral. ------- */
/* --------- It's unlikely this will ever actually be used anywhere, -------- */
/* --------- unless I'm feeling extremely lazy while working on the --------- */
/* ------------------------ interface for batallions. ----------------------- */

const cardinalSquare = (direction, distance) => {
    let center = squares[3][3]
    if (distance === 0) { return center }
    else {
        if (direction == "north") { return squares[3 - distance][3] }
        if (direction == "south") { return squares[3 + distance][3] }
        if (direction == "east") { return squares[3][3 + distance] }
        if (direction == "west") { return squares[3][3 - distance] }
    }
}

/* -------------- See above comments- this may not ever be used ------------- */
/* ---------------- However, it might be a nice reference for --------------- */
/* ------------------------------- the engine. ------------------------------ */
const squareRelation = (square) => {
    let center = squares[3][3]
    let row = 0
    let column = 0
    for (let i = 0; i < 7; i++) {
        if (squares[i].includes(square)) {
            row = i
            column = squares[i].indexOf(square)
        }
    }
    let rowDiff = row - 3
    let columnDiff = column - 3
    if (rowDiff === 0 && columnDiff === 0) { return "center" }
    if (rowDiff === 0) {
        if (columnDiff > 0) { return "east" }
        if (columnDiff < 0) { return "west" }
    }
    if (columnDiff === 0) {
        if (rowDiff > 0) { return "south" }
        if (rowDiff < 0) { return "north" }
    }
    if (rowDiff > 0 && columnDiff > 0) { return "southeast" }
    if (rowDiff > 0 && columnDiff < 0) { return "southwest" }
    if (rowDiff < 0 && columnDiff > 0) { return "northeast" }
    if (rowDiff < 0 && columnDiff < 0) { return "northwest" }
}

export { squares, cardinalSquare, squareRelation }