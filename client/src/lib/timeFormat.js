const timeFormat = (minutes)=>{
    const hours = Math.floor(minutes / 60);
    const minRemain = minutes % 60;
    return `${hours}h ${minRemain}m`
}

export default timeFormat;