// Allow dropping an item
function allowDrop(event) {
    event.preventDefault();  // Necessary to allow drop
  }
  
  // Handle the drag event
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);  // Store the ID of the dragged item
  }
  
  // Handle the drop event
  function drop(event) {
    event.preventDefault();  // Prevent default action (e.g., opening the dragged item as link)
    var data = event.dataTransfer.getData("text");  // Get the dragged item's ID
    var draggedItem = document.getElementById(data);  // Get the element by ID
  
    // Append the dragged item to the zone (hanging, sorting, or shoe processing)
    event.target.appendChild(draggedItem);
    draggedItem.style.marginTop = "10px";  // Add some spacing between items once dropped
    draggedItem.style.cursor = "default";  // Change cursor to default for dropped items
  }
  