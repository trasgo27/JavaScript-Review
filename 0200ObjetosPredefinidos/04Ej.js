const userSubscriptions = [
    { username: "alex99", signupDate: "2026-05-15", trialDays: 30, renewPrice: 9.9 },
    { username: "maria_88", signupDate: "2026-06-01", trialDays: 15, renewPrice: 14.995 },
    { username: "brian_t", signupDate: "2026-04-10", trialDays: 45, renewPrice: 4.991 }
];
const userSubscriptionsDOS = userSubscriptions.map((f)=>{
    const fechaTarget = new Date("2026-06-08");
    const expirationDate = new Date(f.signupDate);
    expirationDate.setDate(expirationDate.getDate()+f.trialDays);
    const rawdiasDisponibles = ( expirationDate-fechaTarget)/(1000*60*60*24); //milisegundos
    const diasDisponibles= Math.ceil(rawdiasDisponibles);
    const ExpiracionFormateada = expirationDate.toLocaleDateString();
    return {
        username :f.username,
        signupDate : f.signupDate,
        trialDays :f.trialDays,
        renewPrice :f.renewPrice.toFixed(2),//dos decimales Number.toFixed(2)
        expirationDate :ExpiracionFormateada,
        diasDisponibles : diasDisponibles
    };
});
console.log(userSubscriptionsDOS);
console.table(userSubscriptionsDOS);
//Añadir dias pendientes hasta 2026-06-08


