const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const list = $('.app_list')
const add = $('.app_add')
const inputValue = $('.app_input-tag')

createStorage = key => {
    const store = JSON.parse(localStorage.getItem(key)) ?? {}
    const save = () => {
        localStorage.setItem(key, JSON.stringify(store))
    }
    const storage = {
        getBeginValue: () => {
            return store
        },
        get(key) {
            return store[key]
        },
        set(key, value) {
            store[key] = value
            save()
        },
        remove(key) {
            delete store[key]
            save()
        },
    }   
    return storage 
}

;(app = () => {
    
    let toDoList 
    let LIST = []
    
    getValue = () => inputValue.value

    deleteValue = (e) => {
        e.stopPropagation()
        const btnDelete = e.target.closest('.app_close-item')
        const item = e.target.closest('.app_list-item')
        if(btnDelete){
            const index = item.dataset.index
            list.removeChild(item)
            delete LIST[index]
            toDoList.remove(index)
        }
    }
    addValue = (currentValue) => {  
        LIST.push([currentValue,"unfinished"])
        toDoList.set(LIST.length-1,[currentValue,"unfinished"])
    }
    clearValue = () => {
        inputValue.value = ""
        inputValue.focus()
    }
    checkDone = (e) => {
        const item = e.target.closest('.app_list-item')
        if(item){
            const index = item.dataset.index 
            if(LIST[index][1] == "finished"){
                LIST[index][1] = "unfinished"
                toDoList.set(index,LIST[index])
                item.classList.remove('done')
            }
            else{
                  item.classList.add('done')
                  LIST[index][1] = "finished"
                  toDoList.set(index,LIST[index])
                  
            }
        }
    }
    render = () => {
        const html  = LIST.map((item,index) => {
    
        return item[1] == "finished" && item!= undefined ?  ` <li class ="app_list-item done" data-index = ${index}>
                                             <span class="app_item-done"><i class="fas fa-check"></i></span>
                                             <div class="app_content">
                                                 <p>${item[0]}</p>
                                                <span class = "app_close-item">&times;</span>
                                             </div>
                                        </li>` 
                                    : ` <li class ="app_list-item" data-index = ${index}>
                                                  <span class="app_item-done"><i class="fas fa-check"></i></span>
                                                    <div class="app_content">
                                                        <p>${item[0]}</p>
                                                        <span class = "app_close-item">&times;</span>
                                                    </div>
                                        </li>` 
        })
        .join('')
        list.innerHTML = html
    }
    handle = () => {
        add.onclick = (e) => {
            var currentValue = getValue();
            if(currentValue !== ""){
                addValue(currentValue)
                clearValue()
                render()
            }
        }
        list.onclick = function(e) {
            checkDone(e)
            deleteValue(e)
        }
    }

    ;(init = () => {
        toDoList = createStorage('toDo_List')
        LIST = []
        const store = toDoList.getBeginValue()
        let indexStore = Object.keys(store)
        for (var i = 0; i < indexStore.length; i++) {
            if(store[`${indexStore[i]}`] != undefined) {
                LIST[indexStore[i]] = store[`${indexStore[i]}`]
            }
        } 
        if(indexStore.length !=0) render()
        
        handle()
    })()    
})()

