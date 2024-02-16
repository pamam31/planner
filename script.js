$(document).ready(function () {

    $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
    // Get the current hour
    const currentHour = dayjs().hour();
  
    // Create time blocks
    const container = $(".container");
  
    for (let hour = 00; hour <= 23; hour++) {
      const timeBlock = $("<div>").addClass("row time-block");
      const hourBlock = $("<div>").addClass("col-1 hour").text(`${hour}:00`);
      const textArea = $("<textarea>").addClass("col-10 description").attr("data-hour", hour);
      const saveBtn = $("<button>").addClass("col-1 saveBtn").html('<i class="fas fa-save"></i>');
  
      // Append elements to time block
      timeBlock.append(hourBlock, textArea, saveBtn);
      container.append(timeBlock);
  
      // Color code time blocks based on past, present, or future
      if (hour < currentHour) {
        timeBlock.addClass("past");
      } else if (hour === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
  
      // Load events from local storage
      const storedEvent = localStorage.getItem(`event-hour-${hour}`);
      if (storedEvent) {
        textArea.val(storedEvent);
      }
    }
  
    // Event listener for save buttons
    $(".saveBtn").on("click", function () {
      const hour = $(this).siblings(".description").attr("data-hour");
      const eventText = $(this).siblings(".description").val();
  
      // Save to local storage
      localStorage.setItem(`event-hour-${hour}`, eventText);
    });
  });
  