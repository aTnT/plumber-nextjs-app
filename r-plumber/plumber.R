# plumber.R

library(leaflet)
library(htmlwidgets)

#* @apiTitle My Plumber API

#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg = "") {
  list(msg = paste0("The message is: '", msg, "'"))
}

#* Return a simple greeting
#* @get /hello
function() {
  list(greeting = "Hello from R Plumber!")
}

#* Perform a simple calculation
#* @param x The first number
#* @param y The second number
#* @post /add
function(x, y) {
  result <- as.numeric(x) + as.numeric(y)
  list(result = result)
}

#* Plot coordinates on a map
#* @param lat:numeric latitude
#* @param lon:numeric longitude
#* @get /map
#* @serializer htmlwidget
function(lat, lon) {
  # Convert lat and lon to numeric
  lat <- as.numeric(lat)
  lon <- as.numeric(lon)
  
  # Create a leaflet map
  map <- leaflet() %>%
    addTiles() %>%  # Add default OpenStreetMap tiles
    setView(lng = lon, lat = lat, zoom = 10) %>%  # Set the view to the input coordinates
    addMarkers(lng = lon, lat = lat)  # Add a marker at the input coordinates
  
  # Return the map
  map
}