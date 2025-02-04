function customize(item, previousPage) {
    localStorage.setItem("item", item)
    localStorage.setItem("previous", previousPage)
    window.location.href = "customize.html"
}

function customizepageloaded() {
}

function addtocart() {
    const screen_blur = document.getElementById("screen-blur")
    const item_bought_align = document.getElementById("item-bought-align")

    // Add to cart
    
    var cart = JSON.parse(localStorage.getItem("cart")) || []

    // Get item info

    const item_name = document.getElementById("itemname").dataset.name
    const cpu_choice = document.getElementById("cpu").dataset.option
    const gpu_choice = document.getElementById("gpu").dataset.option
    const ram_choice = document.getElementById("ram").dataset.option
    const storage_choice = document.getElementById("storage").dataset.option
    const monitor_choice = document.getElementById("monitor").dataset.option
    const peripherals_choice = document.getElementById("peripherals").dataset.option
    const osver_choice = document.getElementById("osver").dataset.option

    // Get Total & Points

    const total = document.getElementById("total-text").dataset.total
    const points = document.getElementById("points-text").dataset.points
    
    // Genereate a unique ID

    const id = guidGenerator()

    const item = {"id" : id, "name" : item_name, "cpu" : cpu_choice, "gpu" : gpu_choice, "ram" : ram_choice, "storage" : storage_choice, "monitor" : monitor_choice, "peripherals" : peripherals_choice, "osver" : osver_choice, "total" : total, "points" : points}

    // Add to cart list
    cart.push(item)

    localStorage.setItem("cart", JSON.stringify(cart))

    // Blur out the page

    screen_blur.classList.add("cardshow")
    item_bought_align.classList.add("cardshow")
}

function helpfulagree(review_id) {
    helpfulchange(review_id)
}

function helpfuldisagree(review_id) {
    helpfulchange(review_id)
}

function helpfulchange(review_id) {
    const reviewelements = document.getElementsByClassName(review_id)
    for (var i = 0; i < reviewelements.length; i++) {
        var element = reviewelements.item(i)
        if (element.classList.contains("helpful-button")) {
            element.style.display = "none"
        } else if (element.classList.contains("helpful-text")) {
            element.innerHTML = "Thank You for your feedback"
        }
    }
}

function goback() {
    const prev_page = localStorage.getItem("previous") ? localStorage.getItem("previous") : "index.html"
    window.location.href = prev_page
}

function remove_item(item_id) {
    const item_element = document.getElementsByClassName(item_id)

    const cart = JSON.parse(localStorage.getItem("cart"))

    cart.forEach(item => {
        if (item.id == item_id) {
            const index = cart.indexOf(item)
            if (index > -1) {
                cart.splice(index, 1)
                console.log(cart)
                localStorage.setItem("cart", JSON.stringify(cart))

                const total_display = document.getElementById("total-amount")
                const gst_display = document.getElementById("gst-amount")
                const points_display = document.getElementById("points-amount")
                const payable_display = document.getElementById("amount-payable")

                const new_total = Number(total_display.dataset.amount) - Number(item.total)
                const new_gst = new_total * 0.09
                const new_points = Number(points_display.dataset.amount) - Number(item.points)
                const new_payable = new_total + new_gst

                total_display.dataset.amount = new_total
                total_display.innerHTML = addcommasinnumber(new_total)

                gst_display.dataset.amount = new_gst
                gst_display.innerHTML = addcommasinnumber(new_gst)

                points_display.dataset.amount = new_points
                points_display.innerHTML = new_points

                payable_display.dataset.amount = new_payable
                payable_display.innerHTML = addcommasinnumber(new_payable)
            }
        }
    })
    
    for (var i = 0; i < item_element.length;) {
        console.log(item_element.item(i))
        item_element.item(i).remove()
    }
}

function gettotal() {
    const cart = JSON.parse(localStorage.getItem("cart"))
    const items_div = document.getElementById("items")
    const items = items_div.children
    const bill = document.getElementById("bill")

    var total_points = 0
    // Create Item

    cart.forEach(item => {

        // Add points to total

        total_points += Number(item.points) 

        // Item Div Background
        
        const item_bg = document.createElement("div")
        item_bg.classList.add("item", item.id)
        item_bg.dataset.itemname = item.name
        item_bg.dataset.cost = item.total
        item_bg.dataset.points = item.points
        item_bg.dataset.id = item.id
        items_div.appendChild(item_bg)

        // Item Image

        const item_img = document.createElement("img")
        item_img.classList.add("item-img")
        item_img.src = `img/${item.name}.png`
        item_bg.appendChild(item_img)

        // Item Specs Div

        const item_specs_bg = document.createElement("div")
        item_specs_bg.classList.add("item-specs", "ubuntu-medium")
        item_bg.appendChild(item_specs_bg)

        // Item Name

        const item_name = document.createElement("h1")
        item_name.innerHTML = item.name
        item_specs_bg.appendChild(item_name)
        
        // CPU Spec

        const cpu_choice = document.createElement("h4")
        cpu_choice.innerHTML = `CPU: ${item.cpu}`
        item_specs_bg.appendChild(cpu_choice)
                
        // GPU Spec

        const gpu_choice = document.createElement("h4")
        gpu_choice.innerHTML = `GPU: ${item.gpu}`
        item_specs_bg.appendChild(gpu_choice)
                        
        // RAM Spec

        const ram_choice = document.createElement("h4")
        ram_choice.innerHTML = `RAM: ${item.ram}`
        item_specs_bg.appendChild(ram_choice)
                        
        // Storage Spec

        const storage_choice = document.createElement("h4")
        storage_choice.innerHTML = `Storage: ${item.storage}`
        item_specs_bg.appendChild(storage_choice)
                        
        // OS Version Choice

        const osver_choice = document.createElement("h4")
        osver_choice.innerHTML = `GPU: ${item.osver}`
        item_specs_bg.appendChild(osver_choice)
                        
        // Monitor Choice

        const monitor_choice = document.createElement("h4")
        monitor_choice.innerHTML = `GPU: ${item.monitor}`
        item_specs_bg.appendChild(monitor_choice)
                        
        // Peripherals Choice

        const peripherals_choice = document.createElement("h4")
        peripherals_choice.innerHTML = `GPU: ${item.peripherals}`
        item_specs_bg.appendChild(peripherals_choice)

        // Remove Button

        const remove_button = document.createElement("button")
        remove_button.classList.add("remove-button")
        remove_button.onclick = function() {remove_item(item.id)}
        remove_button.innerHTML = "Remove"
        item_specs_bg.appendChild(remove_button)
    });

    var total = 0

    for (var i = 0; i < items.length; i++) {
        const item = items.item(i)
        const cost = Number(item.dataset.cost)
        const item_id = item.dataset.id
        const item_name = item.dataset.itemname

        total += cost

        const cost_string = addcommasinnumber(cost)

        // Create Item Bill

        const bill_bg = document.createElement("div")
        bill_bg.classList.add("item-bill")
        bill_bg.classList.add(item_id)
        bill.appendChild(bill_bg)

        const bill_item_name = document.createElement("h4")
        bill_item_name.classList.add("item-name")
        bill_item_name.innerHTML = item_name
        bill_bg.appendChild(bill_item_name)

        const bill_item_cost = document.createElement("h4")
        bill_item_cost.classList.add("item-cost")
        bill_item_cost.innerHTML = cost_string
        bill_bg.appendChild(bill_item_cost)
    }

    // Create Final Cost
    
    const final_bg = document.createElement("div")
    final_bg.id = "total-cost-points"
    bill.appendChild(final_bg)

    // Total Cost before GST

    const total_string = addcommasinnumber(total)

    const total_cost_bg = document.createElement("div")
    total_cost_bg.classList.add("item-bill")
    total_cost_bg.id = "total-item-cost-div"
    final_bg.appendChild(total_cost_bg)

    const total_text = document.createElement("h4")
    total_text.classList.add("item-name")
    total_cost_bg.appendChild(total_text)
    total_text.innerHTML = "Total"

    const total_cost = document.createElement("h4")
    total_cost.classList.add("item-cost")
    total_cost.id = "total-amount"
    total_cost.dataset.amount = total
    total_cost_bg.appendChild(total_cost)
    total_cost.innerHTML = total_string


    // GST

    const GST = (total * 0.09).toFixed(2)

    const GST_string = addcommasinnumber(GST)

    const GST_bg = document.createElement("div")
    GST_bg.classList.add("item-bill")
    final_bg.appendChild(GST_bg)

    const GST_text = document.createElement("h4")
    GST_text.classList.add("item-name")
    GST_bg.appendChild(GST_text)
    GST_text.innerHTML = "GST"

    const GST_cost = document.createElement("h4")
    GST_cost.classList.add("item-cost")
    GST_cost.id = "gst-amount"
    GST_cost.dataset.amount = GST
    GST_bg.appendChild(GST_cost)
    GST_cost.innerHTML = GST_string

    // Points

    const Points_bg = document.createElement("div")
    Points_bg.classList.add("item-bill")
    final_bg.appendChild(Points_bg)

    const Points_text = document.createElement("h4")
    Points_text.classList.add("item-name")
    Points_bg.appendChild(Points_text)
    Points_text.innerHTML = "Points Earned"

    const Points_amount = document.createElement("h4")
    Points_amount.classList.add("item-cost")
    Points_amount.id = "points-amount"
    Points_amount.dataset.amount = total_points
    Points_bg.appendChild(Points_amount)
    Points_amount.innerHTML = total_points

    // Amount Payable

    const To_Pay = total + parseFloat(GST)

    const To_Pay_String = addcommasinnumber(To_Pay)

    const To_Pay_bg = document.createElement("div")
    To_Pay_bg.classList.add("item-bill")
    final_bg.appendChild(To_Pay_bg)

    const To_Pay_text = document.createElement("h4")
    To_Pay_text.classList.add("item-name")
    To_Pay_bg.appendChild(To_Pay_text)
    To_Pay_text.innerHTML = "To Pay"

    const To_Pay_amount = document.createElement("h4")
    To_Pay_amount.classList.add("item-cost")
    To_Pay_amount.id = "amount-payable"
    To_Pay_amount.dataset.amount = To_Pay
    To_Pay_bg.appendChild(To_Pay_amount)
    To_Pay_amount.innerHTML = To_Pay_String

    // Point Option

}

function payment(type) {
    const Payable_Amount = document.getElementById("amount-payable").dataset.amount

    // Initiate Lucky Draw

    const chance_index = Math.random()

    if (chance_index > 0.1) {
        alert("You won 10 dollars!")
    } else if (0.02 < chance_index <= 0.1) {
        alert("You won 500 dollars!")
    } else {
        alert("You won a free monitor!")
    }
}

function addcommasinnumber(value) {
    var value_string = "S$"

    // number of digits in the first set
    
    const first_set_amount = value.toString().length % 3

    for (var i = 0; i < value.toString().length; i++) {
        const digit = value.toString()[i]
        const placement = i + 1
        
        value_string += digit

        // Add in the commas between the numbers

        if ((placement - first_set_amount)% 3 == 0 && placement != value.toString().length && value.toString()[placement] != ".") {
            value_string += ","
        }
    }

    return value_string
}

// Generates an id
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

document.getElementById("point-option").addEventListener("change", function() {
    const Payable_Amount_Display = document.getElementById("amount-payable")
    const Point_Option = document.getElementById("point-option")
    const Total_Display = document.getElementById("amount-payable")

    if (document.getElementById("point-option0").checked) {
        const Point_to_Dollars = Point_Option.dataset.points / 10
        const Payable_Amount_After_Points = Payable_Amount_Display.dataset.amount - Point_to_Dollars

        const Payable_Amount_After_Points_String = addcommasinnumber(Payable_Amount_After_Points)

        Total_Display.innerHTML = Payable_Amount_After_Points_String
        
    } else {
        const Payable_Amount_String = addcommasinnumber(Total_Display.dataset.amount)

        Total_Display.innerHTML = Payable_Amount_String
    }
})