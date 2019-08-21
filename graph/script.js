window.onload = function () {
    initGraph();
};

function initGraph() {
    var dataset = [];
    // create an array with nodes
    // var nodes = new vis.DataSet([
    //     {id: 'simon', label: 'Node 1'},
    //     {id: 2, label: 'Node 2'},
    //     {id: 3, label: 'Node 3'},
    //     {id: 4, label: 'Node 4'},
    //     {id: 5, label: 'Node 5'}
    // ]);

    people.forEach(p => {
        dataset.push(
            { id: p.id, label: p.name, shape: 'circularImage', image: 'images/' + p.id + '.jpg' }
        );
    });
    dataset.push(
        { id: 'lth', label: 'LTH', shape: 'circularImage', image: 'images/lth.jpg' }
    );

    var nodes = new vis.DataSet(dataset);
    // create a network
    var data = {
        nodes: nodes,
        edges: edges
    };

    var container = document.getElementById('thegraph');

    var options = {
        locale: 'sv',
        nodes: {
            borderWidth: 8,
            size: 30,
            color: {
                border: '#222222',
                background: '#666666'
            }
        },
        edges: {
            color: 'lightgray'
        },
        hierarchical: true
    };
    new vis.Network(container, data, options);
}

// create an array with edges
var edges = new vis.DataSet([
    { from: 'simonhillbom', to: 'josefinhillbom', label: 'Brudparet' },
    { from: 'simonhillbom', to: 'jeanettehillbom', label: 'Mamma' },
    { from: 'simonhillbom', to: 'björnhillbom', label: 'Pappa' },
    { from: 'simonhillbom', to: 'sofiehillbom', label: 'Syster' },
    { from: 'simonhillbom', to: 'izahillbom', label: 'Syster' },
    { from: 'somfiehillbom', to: 'samuelzeitler', label: 'sambo' },


    { from: 'simonhillbom', to: 'örjanhillbom', label: 'Farbror' },
    { from: 'örjanhillbom', to: 'lottahillbom', label: 'gifta' },
    { from: 'lottahillbom', to: 'emilhedlund' },
    { from: 'emilhedlund', to: 'elinnyström', label: 'sambo' },
    { from: 'lottahillbom', to: 'charliehillbom' },
    { from: 'davidhåkansson', to: 'charliehillbom', label: 'sambo' },


    { from: 'simonhillbom', to: 'tintinlagerstedt', label: 'Faster' },
    { from: 'tintinlagerstedt', to: 'jonaslagerstedt', label: 'gifta' },
    { from: 'tintinlagerstedt', to: 'filippalagerstedt' },
    { from: 'tintinlagerstedt', to: 'fabianlagerstedt' },
    { from: 'tintinlagerstedt', to: 'jonathanlagerstedt' },

    // {from: 'jeanettehillbom', to: 'björnhillbom', label: 'Gifta'},

    { from: 'josefinhillbom', to: 'evalisekarlsson', label: 'Mamma' },
    { from: 'josefinhillbom', to: 'börjekarlsson', label: 'Pappa' },
    { from: 'josefinhillbom', to: 'johankarlsson', label: 'Bror' },
    { from: 'josefinhillbom', to: 'antonkarlsson', label: 'Bror' },
    { from: 'antonkarlsson', to: 'carinakarlsson', label: 'gifta' },
    { from: 'johankarlsson', to: 'sarakarlsson', label: 'gifta' },

    { from: 'carinakarlsson', to: 'alvakarlsson' },
    { from: 'carinakarlsson', to: 'alexanderroserlius' },
    { from: 'carinakarlsson', to: 'ludvigroserlius' },

    { from: 'sarakarlsson', to: 'alfredkarlsson' },



    // {from: 'evalisekarlsson', to: 'börjekarlsson', label: 'Gifta'},

    // LTH
    { from: 'simonhillbom', to: 'lth' },
    { from: 'josefinhillbom', to: 'lth' },
    { from: 'mazdakfarzone', to: 'lth' },
    { from: 'sandraolsson', to: 'lth' },
    { from: 'robinlindberg', to: 'lth' },
    { from: 'elinnilsson', to: 'lth' },
    { from: 'glyphandersson', to: 'lth' },
    { from: 'kaiseråkerberg', to: 'lth' },
    { from: 'saralindgren', to: 'lth' },
    { from: 'perrylorénperván', to: 'lth' },
    { from: 'gabriellalorénperván', to: 'lth' },
    { from: 'peterseimar', to: 'lth' },
    { from: 'sannewintren', to: 'lth' },
    { from: 'niklaswintren', to: 'lth' },
    { from: 'joellindholm', to: 'lth' },

    // LTH related
    { from: 'joellindholm', to: 'simonhillbom', label: 'gymnasiet' },
    { from: 'joellindholm', to: 'nikitamaldanerfrohm', label: 'sambo' },
    { from: 'glyphandersson', to: 'linnéanyman', label: 'sambo' },

    // LTH relations
    { from: 'mazdakfarzone', to: 'sandraolsson', label: 'förlovade' },
    { from: 'robinlindberg', to: 'elinnillson', label: 'gifta' },
    { from: 'kaiseråkerberg', to: 'saralindgren', label: 'sambo' },
    { from: 'perrylorénperván', to: 'gabriellalorénperván', label: 'gifta' },
    { from: 'sannewintren', to: 'niklaswintren', label: 'gifta' },

]);


var people = [
    {
        name: "Josefin Hillbom",
        id: "josefinhillbom"
    },
    {
        name: "Simon Hillbom",
        id: "simonhillbom"
    },
    {
        name: "Alexander Roserlius",
        id: "alexanderroserlius"
    },
    {
        name: "Alexandra Gustavsson",
        id: "alexandragustavsson"
    },
    {
        name: "Johan Westerberg",
        id: "johanwesterberg"
    },
    {
        name: "Alfred Karlsson",
        id: "alfredkarlsson"
    },
    {
        name: "Alva Karlsson",
        id: "alvakarlsson"
    },
    {
        name: "Anita Bröjesson",
        id: "anitabröjesson"
    },
    {
        name: "Sune Börjesson",
        id: "sunebörjesson"
    },
    {
        name: "Annika Börjesson",
        id: "annikabörjesson"
    },
    {
        name: "Inge Börjesson",
        id: "ingebörjesson"
    },
    {
        name: "Börje Karlsson",
        id: "börjekarlsson"
    },
    {
        name: "Eva Lise Karlsson",
        id: "evalisekarlsson"
    },
    {
        name: "Catarina Nyberg",
        id: "catarinanyberg"
    },
    {
        name: "Anton Karlsson",
        id: "antonkarlsson"
    },
    {
        name: "Elin Nyberg",
        id: "elinnyberg"
    },
    {
        name: "Carl Elfström",
        id: "carlelfström"
    },
    {
        name: "Eva Gustavsson",
        id: "evagustavsson"
    },
    {
        name: "Johan Karlsson",
        id: "johankarlsson"
    },
    {
        name: "Sara Karlsson",
        id: "sarakarlsson"
    },
    {
        name: "Karl Gustavsson",
        id: "karlgustavsson"
    },
    {
        name: "Lelle Nyberg",
        id: "lellenyberg"
    },
    {
        name: "Carina Karlsson",
        id: "carinakarlsson"
    },
    {
        name: "Lill-Annika Börjesson",
        id: "lill-annikabörjesson"
    },
    {
        name: "Mattias Brant",
        id: "mattiasbrant"
    },
    {
        name: "Lina Gustavsson",
        id: "linagustavsson"
    },
    {
        name: "Ludvig Roserlius",
        id: "ludvigroserlius"
    },
    {
        name: "Niclas Gamme",
        id: "niclasgamme"
    },
    {
        name: "Teresia Börjesson",
        id: "teresiabörjesson"
    },
    {
        name: "Olof Nyberg",
        id: "olofnyberg"
    },
    {
        name: "Viktoria Börjesson",
        id: "viktoriabörjesson"
    },
    {
        name: "Johannes Börjesson",
        id: "johannesbörjesson"
    },
    {
        name: "Dag Lindahl",
        id: "daglindahl"
    },
    {
        name: "Elin Nilsson",
        id: "elinnilsson"
    },
    {
        name: "Robin Lindberg",
        id: "robinlindberg"
    },
    {
        name: "Glyph Andersson",
        id: "glyphandersson"
    },
    {
        name: "Linnéa Nyman",
        id: "linnéanyman"
    },
    {
        name: "Joel Lindholm",
        id: "joellindholm"
    },
    {
        name: "Nikita Maldaner Frohm",
        id: "nikitamaldanerfrohm"
    },
    {
        name: "Kaiser Åkerberg",
        id: "kaiseråkerberg"
    },
    {
        name: "Sara Lindgren",
        id: "saralindgren"
    },
    {
        name: "Mazdak Farzone",
        id: "mazdakfarzone"
    },
    {
        name: "Sandra Olsson",
        id: "sandraolsson"
    },
    {
        name: "Perry Lorén Perván",
        id: "perrylorénperván"
    },
    {
        name: "Gabriella Lorén Perván",
        id: "gabriellalorénperván"
    },
    {
        name: "Peter Seimar",
        id: "peterseimar"
    },
    {
        name: "Sanne Wintren",
        id: "sannewintren"
    },
    {
        name: "Niklas Wintren",
        id: "niklaswintren"
    },
    {
        name: "Björn Hillbom",
        id: "björnhillbom"
    },
    {
        name: "Jeanette Hillbom",
        id: "jeanettehillbom"
    },
    {
        name: "Charlie Hillbom",
        id: "charliehillbom"
    },
    {
        name: "David Håkansson",
        id: "davidhåkansson"
    },
    {
        name: "Elin Nyström",
        id: "elinnyström"
    },
    {
        name: "Emil Hedlund",
        id: "emilhedlund"
    },
    {
        name: "Fabian Lagerstedt",
        id: "fabianlagerstedt"
    },
    {
        name: "Filippa Lagerstedt",
        id: "filippalagerstedt"
    },
    {
        name: "Iza Hillbom",
        id: "izahillbom"
    },
    {
        name: "Jonas Lagerstedt",
        id: "jonaslagerstedt"
    },
    {
        name: "Tintin Lagerstedt",
        id: "tintinlagerstedt"
    },
    {
        name: "Jonathan Lagerstedt",
        id: "jonathanlagerstedt"
    },
    {
        name: "Örjan Hillbom",
        id: "örjanhillbom"
    },
    {
        name: "Lotta Hillbom",
        id: "lottahillbom"
    },
    {
        name: "Samuel Zeitler",
        id: "samuelzeitler"
    },
    {
        name: "Sofie Hillbom",
        id: "sofiehillbom"
    }
]