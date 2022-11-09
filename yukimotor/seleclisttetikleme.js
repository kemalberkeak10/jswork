$(function() {
    var specificCode = userData.specificCode3;
    switchServiceType(specificCode);
})

function switchServiceType(specificCode) {
    switch (specificCode) {
        case "766AD330E6A94D109777D0D6AFC75562":
            $('#161E178549184A3E8194EB9EAEDCDE36').select2('data', { id: "766AD330E6A94D109777D0D6AFC75562", text: "İç Servis" });
            $('#161E178549184A3E8194EB9EAEDCDE36').trigger('change');
            break;
        case "09F5E2F3C00E4CE9832C8769842143CE":
            $('#161E178549184A3E8194EB9EAEDCDE36').select2('data', { id: "09F5E2F3C00E4CE9832C8769842143CE", text: "Dış Servs" });
            $('#161E178549184A3E8194EB9EAEDCDE36').trigger('change');
            break;
        default:
            break;
    }
}