var crudApp = new function () {

    // List Items
    this.myBooks = [
        {ID: '1' , Book_Name: 'Doraemon', Category: 'Comic' , Price: 3},
        {ID: '2' , Book_Name: 'Giao Duc Cong Dan', Category: 'SGK' , Price: 4},
        {ID: '3' , Book_Name: 'PlayBoy', Category: 'Magazine' , Price: 5}
        
        ];
     this.category = ['Comic' , 'SGK' , 'Magazine' , 'Programming' , 'Science' , 'Football'];
     this.col = [];

    this.createTable = function () {

        // EXTRACT VALUE FOR TABLE HEADER.
        for (var i = 0; i < this.myBooks.length; i++) {
            for (var key in this.myBooks[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }
        var h1 = document.createElement('h1');
        h1.id = 'title';
        h1.innerHTML = 'CRUD APPLICATION';

        // CREATE A TABLE.
        var div = document.getElementById('container');
        div.innerHTML = '';
        var table = document.createElement('table');
        table.id = 'booksTable';
        div.appendChild(h1);
        div.appendChild(table)

        var tr = table.insertRow(-1);               // CREATE A ROW FOR HEADER.

        for (var h = 0; h < this.col.length; h++) {
            // ADD TABLE HEADER.
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        // ADD ROWS USING JSON DATA.
        for (var i = 0; i < this.myBooks.length; i++) {

            tr = table.insertRow(-1);           // CREATE A NEW ROW.

            for (var j = 0; j < this.col.length; j++) {
                var tableCell = tr.insertCell(-1);
                tableCell.innerHTML = this.myBooks[i][this.col[j]];
            }

            // tạo nút cập nhật hàng hóa 
            
            //Cancel button
            this.td = document.createElement('td');
            tr.appendChild(this.td);
            var labelCancel = document.createElement('label');
            labelCancel.innerHTML = '&#10006' ;
            labelCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            labelCancel.style.display = 'none';
            labelCancel.title = 'Cancel';
            labelCancel.id = 'label' + i;
            this.td.appendChild(labelCancel);

            //Save button
            tr.appendChild(this.td);
            var btnSave = document.createElement('input');
            btnSave.type = 'button';
            btnSave.value = 'Save';
            btnSave.setAttribute( 'id', 'Save' + i);
            btnSave.style.display = 'none';
            btnSave.setAttribute('onclick', 'crudApp.Save(this)');
            this.td.appendChild(btnSave);

            //Update button
            tr.appendChild(this.td);
            var btnUpdate = document.createElement('input');
            btnUpdate.setAttribute('type', 'button');
            btnUpdate.setAttribute('value', 'Update');
            btnUpdate.setAttribute('id', 'Edit' + i);
            btnUpdate.style.backgroundColor = '#44CCEB';
            btnUpdate.setAttribute('onclick','crudApp.Update(this)');
            this.td.appendChild(btnUpdate);

            //Delete button
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btnDelete = document.createElement('input');
            btnDelete.type = 'button';
            btnDelete.value = 'Delete';
            btnDelete.style.backgroundColor = '#ED5650';
            btnDelete.setAttribute('onclick','crudApp.Delete(this)');
            this.td.appendChild(btnDelete);
        }


        // ADD A ROW AT THE END .
        var tr = table.insertRow(-1);
        for (var j = 0; j < this.col.length; j++){
            var newCell = tr.insertCell(-1);
            if(j >= 1) {
                if(j == 2){
                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for (var k = 0; k < this.category.length; k++) {
                        select.innerHTML = select.innerHTML 
                        + '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                else {
                    var textBox = document.createElement('input');
                    textBox.type = 'text';
                    textBox.value = '';
                    newCell.appendChild(textBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        //New button
        this.td = document.createElement('td');
        tr.appendChild(this.td);
        var btnNew = document.createElement('input');
        btnNew.type = 'button';
        btnNew.value = 'Create';
        btnNew.id = 'New' + i;
        btnNew.style.backgroundColor = '#207DD1';
        btnNew.setAttribute('onclick', 'crudApp.Create(this)');
        this.td.appendChild(btnNew);
        
        //------Function

        // Cancel Function
        this.Cancel = function (oButton) {
            oButton.style.display = 'none';
            oButton.style.float = 'none';
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var save = document.getElementById('Save' + (activeRow - 1));
            save.style.display = 'none';
            var update = document.getElementById('Edit' + (activeRow - 1));
            update.style.display = 'block';
            update.style.margin = '0 auto';
            update.style.backgroundColor = '#44CCEB';

            var tab = document.getElementById('booksTable').rows[activeRow];
            for (let i = 0; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                td.innerHTML = this.myBooks[(activeRow - 1)][this.col[i]];
            }
        }

        //Update function
        //Create dropdown and textbox on displayed information
        this.Update = function (oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('booksTable').rows[activeRow];

        
        for (i = 1; i < 4; i++) {
            if (i == 2) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');      // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var cancel = document.getElementById('label' + (activeRow - 1));
            cancel.style.cursor = 'pointer';
            cancel.style.display = 'block';
            cancel.style.width = '20px';
            cancel.style.float = 'left';
            cancel.style.position = 'absolute';

            var save = document.getElementById('Save' + (activeRow - 1));
            save.style.cursor = 'pointer';
            save.style.display = 'block';
            save.style.marginLeft = '30px';
            save.style.float = 'left';
            save.style.backgroundColor = '#2DBF64';

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };
        //Delete function 
        this.Delete = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex ;
            this.myBooks.splice((activeRow - 1) ,1);
            this.createTable();
        }

        //Save function
        this.Save = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex ;
            var tab = document.getElementById('booksTable').rows[activeRow];
            for ( let i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute("type") == 'text' || td.childNodes[0].tagName == 'select') { 
                this.myBooks[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;      
            }
        }
            this.createTable();
        }

        // Create New function 
        this.Create = function(oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex ;
            var tab = document.getElementById('booksTable').rows[activeRow];
            var obj = {};

            for (let i = 1; i < this.col.length; i++) {
                var td = tab.getElementsByTagName('td')[i];
                if(td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {
                    var txtValue = td.childNodes[0].value;
                    if (txtValue != '') {
                        obj[this.col[i]] = txtValue.trim();
                    }
                    else {
                        obj = '' ;
                        alert('all fields are compulsory');
                        break;
                    }
                }
            }
            obj[this.col[0]] = this.myBooks.length + 1;  //push new items and refresh table
            if(Object.keys(obj).length > 0) {
                this.myBooks.push(obj);
                this.createTable();
            }
        }
       
        //Create Search Bar
        var search = document.createElement('input');
        search.type = 'text';
        search.placeholder = 'Search...';
        search.id = 'search-bar';
        div.appendChild(search);

        //Search function
        this.searchFunc = function () {
            var input = document.getElementById('search-bar');
            filter = input.value.toUpperCase();
            var booksTable = document.getElementById('booksTable');
            var list = table.getElementsByTagName('tr');
            console.log(list);
            for (let i = 0; i < list.length; i++) {
                var item = list[i].getElementsByTagName('td')[1];
                console.log(item);
                if(item) {
                    var txtValue = item.innerText || item.textContent;
                    console.log(txtValue);
                    if(txtValue.toUpperCase().indexOf(filter) > -1) {
                        list[i].style.display = "";
                    } else {
                        list[i].style.display = 'none';
                    }
                }
                
            }
        }
        search.onkeyup = this.searchFunc; //search event
    };
}

crudApp.createTable();