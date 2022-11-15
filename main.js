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
            
            <div class="btns d-flex">
            <div class="social d-flex">
            <button class="btn btn-primary ">Read more.....</button>
            </div>
            <div class="social d-flex">
            <button class="btn btn-primary ">Trailers</button>
            </div>
            <div class="social d-flex">
            <button class="btn btn-primary ">Add bookmark</button>
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
                <button class="btn btn-primary ">Trailers</button>
                </div>
                <div class="social d-flex">
                <button class="btn btn-primary ">Add bookmark</button>
                </div>
                </div>
                </div>
                `
                $(".wrapper").appendChild(card)
                
            })
        }
        // searchResultRender()