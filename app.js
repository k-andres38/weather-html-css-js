
const centarl=document.querySelector('.central')
const formulario=document.querySelector('.formulario')
const icon=document.querySelector('.icon')
const condition=document.querySelector('.cond')
const grade=document.querySelector('.grade')
const time=document.querySelector('.time')
const precip=document.querySelector('.precip')
const city=document.querySelector('.city')
const temp=document.querySelector('.temp') 
const map=document.querySelector('.mapa') 
const clim=document.querySelector('.clim')

/*  card*/

const template=document.getElementById('idTemplate').content;

const history=document.querySelector('.history')
const cardClim=document.querySelector('.card');
const cardTemp=document.querySelector('.card-temp');
const cardDay=document.querySelector('.card-day');
const cardIconDay=document.querySelector('.cardIconDay');



const key='96da45d08fc94a1f83905422230802'


document.addEventListener('DOMContentLoaded', () => {
    weather()
    
    })


formulario.addEventListener('submit', (e)=>{

    e.preventDefault();
    const input=new FormData(formulario)
    search=input.get('input');

    weather(search)
    
})




const weather=async(search='Bucaramanga')=>{
    const url=`https://api.weatherapi.com/v1/forecast.json?key=96da45d08fc94a1f83905422230802&q=${search}&days=7&aqi=no&alerts=no`;
    const response=await fetch(url);
    const data=await response.json();
    
    console.log(data)
    frontUI(data)
}

function frontUI(info){
    icon.setAttribute('src',info.current.condition.icon)
    grade.textContent=info.current.temp_c+'°'
    clim.textContent=info.current.condition.text

    time.textContent=(info.location.localtime).slice(-5)
    //condition.setAttribute('src',info.current.condition.icon)
    condition.textContent=info.current.condition.text
    precip.textContent=info.current.precip_in;

    city.textContent=info.location.name
    temp.textContent=info.current.temp_c+'°'



    const iframe=`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63344.92628226234!2d${info.location.lon}!3d${info.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!!2s${info.location.name}%${info.location.region}!`;

    map.setAttribute('src',iframe)

    /*card*/ 

    console.log(info.forecast.forecastday)
    const fragment=document.createDocumentFragment();
   
    info.forecast.forecastday.forEach(e => {
        const day = new Date(e.date);
        const dayWeek = 'fd'
       // day.slice(0,3)



        history.textContent=''
        const clone=template.cloneNode(true);
        clone.querySelector('.cardIcon').setAttribute('src',e.day.condition.icon)
        clone.querySelector('.cardClim').textContent = e.day.avgtemp_c
        clone.querySelector('.cardCondition').textContent = e.day.condition.text
        clone.querySelector('.cardIconDay').textContent = day.toString().slice(0,3)
        fragment.appendChild(clone);

        
        
         console.log(day.toString())
    });

    history.appendChild(fragment);
}



