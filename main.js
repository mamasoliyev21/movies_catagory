    "use strict"
    movies.splice(50)
    
    //-----Normalize allmovies---//
    
    const allmovies = movies.map((movie)=>{
        return{
            title:movie.title,
            year:movie.year,
            lang:movie.language,
            summary:movie.summary,
            time:`${Math.floor(movie.runtime/60)}h   ${movie.runtime%60}m `,
            catagory:movie.categories,
            minImg:movie.smallThumbnail,
            maxImg:movie.bigThumbnail,
            id:movie.imdbId,
            rating:movie.imdbRating,
            link:`https://www.youtube.com/embed/${movie.youtubeId}`
        }
    })
    
    //----Rendel allmovies//
    
    const rendelmovies= ()=>{
        allmovies.forEach((e)=>{
            const card =document.createElement("div");
            card.classList.add("shadow-lg","card")
            card.style.padding = "p-5 d-flex;"
            card.style.width = "370px"
            card.innerHTML=`<div class="card "> 
            <img class="img" src="${e.minImg}" alt="img">
            <h2 class="movie-title bg-white">   ${e.title}</h2>
            <ul class="list-unstyled p-4">
            <li class="item"><strong>  Year: ${e.year}</strong></li>
            <li class="item"><strong> Id:  ${e.id}</strong></li>
            <li class="item"><strong>Catagory: ${e.catagory}</strong></li>
            <li class="item"><strong>Language:  ${e.lang}</strong></li>
            <li class="item"><strong> Rating: ${e.rating}</strong></li>
            <li class="item"><strong> Davomiyligi: ${e.time}</strong></li>
            <li class="item"> <a href="${e.link}"></a></li>
            </ul>
            
            <div class="btns d-flex justify-content-around mb-2">
            <div class="social d-flex">
            <button class="btn btn-info " data-add='${e.id}' >Add bookmark</button>
            </div>
            <div class="social d-flex">
            <button class="btn btn-dark  "data-read='${e.id}' >Read more.....</button>
            </div>
            <div class="social d-flex">
            <button class="btn btn-danger "><a class='yotublink' href="${e.link}">TRailer</a></button>
            </div>
            </div>
            </div>
            `
            $(".wrapper").appendChild(card)
            
        })
    }
    rendelmovies()
    $(".card-res").style.display ="none"
    
    // dinamic catagory rendel//\
    
    let catagor= []    
    const dinamicCatagory =()=>{
        allmovies.forEach((e)=>[
            e.catagory.forEach((el)=>{
                if(!catagor.includes(el)){
                    catagor.push(el
                        )
                    }
                })
            ])
            catagor.sort()
            catagor.unshift("ALL")
            catagor.forEach((e)=>{
                const opt = document.createElement("option")
                opt.style.color ="black"
                opt.textContent =e
                $("#catagory").appendChild(opt)
            })
        }
        
        dinamicCatagory()
        
        //----find film funksiya----//
        
        const findmovies =(rejexp,rating =0,Catagory)=>{
            console.log(rating);
            if(Catagory==='ALL'){
                return allmovies.filter((film)=>{
                    return film.title.match(rejexp) && film.rating>=rating 
                })
            }
            return allmovies.filter((film)=>{
                return film.title.match(rejexp) && film.rating>=rating && film.catagory.includes(Catagory)
            })
        }
        
        
        // adeventlistener xolati//
        
        $("#submitForm").addEventListener("submit",(e)=>{
            $(".wrapper").innerHTML =` <div class="load d-flex " ><<span class="loader"></span>></div>`
            const searchvalue = $("#filmname").value
            const filmrating = $("#filmRating").value
            const filmcatagory = $("#catagory").value
            const rejexp =new RegExp(searchvalue, "gi")
            const searchResult = findmovies(rejexp,filmrating,filmcatagory)
            if(searchResult.length>0){
                setTimeout(()=>{   
                    searchResultRender (searchResult)
                    $(".card-res").style.display = "block"
                    $("#res").innerHTML =`<div>${searchResult.length}<div/>`
                },2000)
            }else{
                $(".card-res").style.display ="none"
                $("#res").innerHTML =`<div>${searchResult.length}  <div/>`
                $(".wrapper").innerHTML = `<div class="error">Malumotinggiz xato kiritildi</div>`
            }
        })
        // searchresult render funksiya///
        function searchResultRender (data=[]){
            $(".wrapper").innerHTML =""
            data.forEach((e)=>{
                const card =document.createElement("div");
                card.classList.add("shadow-lg","card")
                card.style.padding = "p-5 d-flex;"
                card.style.width = "370px"
                card.innerHTML=`<div class="card "> 
                <img class="img" src="${e.minImg}" alt="img">
                <h2 class="movie-title bg-white">   ${e.title}</h2>
                <ul class="list-unstyled p-4">
                <li class="item"><strong>  Year: ${e.year}</strong></li>
                <li class="item"><strong> Id:  ${e.id}</strong></li>
                <li class="item"><strong>Catagory: ${e.catagory}</strong></li>
                <li class="item"><strong>Language:  ${e.lang}</strong></li>
                <li class="item"><strong> Rating: ${e.rating}</strong></li>
                <li class="item"><strong> Davomiyligi: ${e.time}</strong></li>
                <li class="item"> <a href="${e.link}"></a></li>
                </ul>
                
                <div class="btns d-flex">
                <div class="social d-flex">
                <button class="btn btn-primary ">Read more.....</button>
                </div>
                <div class="social d-flex">
                <button class="btn btn-primary "> <a href="${e.link}">TRailer</a>  </button>
                </div>
                <div class="social d-flex">
                <button class="btn btn-info " data-add='${e.id}'">Add bookmark</button>
                </div>
                </div>
                </div>
                `
                $(".wrapper").appendChild(card)
                
            })
        }
        // searchResultRender()
        
        
        $(".wrapper").addEventListener("click",(e)=>{
            if(e.target.classList.contains("btn-dark")){  
                const idMovie= e.target.getAttribute('data-read');
                showMODAL(idMovie)
                $(".modal-window").classList.remove("modal-hide")
            }
        })
        
        
        
        $("#close").addEventListener("click", (e)=>{
            $(".modal-window").classList.add("modal-hide");
            $(".modal-content").innerHTML =""
            
        })
        
        function showMODAL (ID) {
            const filmitem =allmovies.filter((e)=>{
                return e.id ==ID
            })
            return  filmitem.forEach(e=>{
                console.log(e.id);
                const row = document.createElement("div")
                row.classList.add("modal-oyna")             
                row.innerHTML=`
                <div class="col-md-4">
                <img src="${e.minImg}" alt="cover" class="img-fluid img-fon ">
                </div>
                <div class="col-md-6">
                <h2 class="modal-title text-primary">
                Film title: ${e.title} 
                </h2>
                <ul class="list-group  w-75">
                <li class="list-group-item">Rating: ${e.rating}</li>
                <li class="list-group-item">Year: ${e.year}</li>
                <li class="list-group-item">Runtime: ${e.time}</li>
                <li class="list-group-item">Catagory: ${e.catagory}</li>
                <li class="list-group-item">Id:  ${e.id}</li>
                <li class="list-group-item">language: ${e.lang}</li>
                </ul>
                </div>
                <div class="col-md-12 ">
                <h4>
                ${e.title}
                </h4>
                <h6 class="text-danger fs-5" >
                <strong class="text-info"> ABOUT THE MOVIE</strong>      : ${e.summary}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo maxime magnam vel, nam natus eveniet, possimus, iste architecto modi asperiores debitis illum repellendus nesciunt laudantium doloribus sapiente voluptatem quaerat provident quo quisquam. Harum, illo.
                </h6>
                </div>
                `
                
                $("#modal-text").appendChild(row);
            }
            )
        }
        
        // add bokmark//\

        $(".wrapper").addEventListener("click",(e)=>{
            if(e.target.classList.contains("btn-info")){  
                const idMovie= e.target.getAttribute('data-add');
               addBokmark(idMovie)
            }
        })
        
        const bookmark = []
        function addBokmark(id){
            const filmitem =allmovies.filter((e)=>{
                return e.id ==id
            });
            if(!bookmark.includes(filmitem[0])){
                bookmark.push(filmitem[0])
            } else{
                console.log('adawdiz');
            }
            localStorage.setItem("bookmark",JSON.stringify(bookmark))

        }
        
        