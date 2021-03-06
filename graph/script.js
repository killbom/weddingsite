if (location.protocol !== "https:" && location.protocol !== "file:") {
    location.protocol = "https:";
}

var nw = null;
window.onload = function () {
    initGraph();
    nw.on("stabilizationIterationsDone", function () {
        network.setOptions({
            nodes: {physics: false},
            edges: {physics: false},
        });
    });
};

function initGraph() {
    var dataset = [];

    people.forEach(p => {
        dataset.push(createNode(p));
    });

    var nodes = new vis.DataSet(dataset);
    // create a network
    var data = {
        nodes: nodes,
        edges: edges
    };

    var container = document.getElementById('thegraph');

    var options = {
        nodes: {
            //shape: 'dot',
            borderWidth: 2,
        },
        edges: {
            color: 'lightgray',
            font: { align: 'middle' }
        },
        physics: {
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: {
                enabled: true,
                iterations: 100,
                updateInterval: 25
            }

        }
    };
    nw = new vis.Network(container, data, options);
    var selected = null;
    nw.on("deselectNode", function (params) {
        var node = params.previousSelection.nodes[0];
        if (node != null) {
            nodes.update({ id: node, label: shortName(node), size: null });
        }
    });
    nw.on("click", function (params) {
        var node = params.nodes[0];
        if (node == null || node == selected) {
            if (selected != null) nodes.update({ id: selected, label: shortName(selected), size: null });
            
            selected = null;
        } else {
            var name = getNode(node);
            nodes.update({ id: node, label: name.fullname || name.name, size: 80 })

            if (selected != null) nodes.update({ id: selected, label: shortName(selected), size: null });
            selected = node;
        }  
    });
    var reset = false;
    nw.on("zoom", function (params) {
        console.log(params.scale)
        if (reset) {
            return;
        }
        if (params.scale > 7 || params.scale < 0.4) {
            reset = true;
            resetView();
            window.setTimeout(function() {
                reset = false;
            }, 500)
        }
    });

    document.getElementById("reset-button").onclick = function(){resetView()};

    window.setTimeout(function() {
        resetView();
    }, 1500)
}

function resetView() {
    nw.fit({
        nodes:['josefinhillbom', 'simonhillbom'],
        animation: true
      });
}

function shortName(id, node) {
    if (node == null) {
        node = getNode(id);
    }

    return node.name.split(' ')[0];
}

function getNode(id) {
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == id) {
            return people[i];
        }
    }

    return null;
}

function createNode(n) {
    node = { id: n.id, label: shortName(n.id, n) };
    if (n.id == 'josefinhillbom' || n.id == 'simonhillbom') {
        if (n.id == 'josefinhillbom') {
            node.color = {
                background: '#ffffff',
                border: '#5b5b5b'
            }
        } else {
            node.color = {
                background: '#b5b0b2',
                border: '#5b5b5b'
            }
        }
    } else {
        var color = Math.floor(Math.random() * 3); 
        if (color === 0){
            node.color = {
                background: '#ff9f80',
                border: '#ff8c66'
            }
        } else if (color === 1) {
            node.color = {
                background: '#f280a1',
                border: '#ee5d86'
            }
        }
    }

    return node;
}

// create an array with edges
var edges = new vis.DataSet([
    { from: 'simonhillbom', to: 'josefinhillbom', label: 'Brudparet' },
    { from: 'simonhillbom', to: 'jeanettehillbom', label: 'Mamma' },
    { from: 'simonhillbom', to: 'björnhillbom', label: 'Pappa' },
    { from: 'simonhillbom', to: 'sofiehillbom', label: 'Syster' },
    { from: 'simonhillbom', to: 'izahillbom', label: 'Syster' },
    { from: 'sofiehillbom', to: 'samuelzeitler', label: 'sambo' },


    { from: 'simonhillbom', to: 'örjanhillbom', label: 'Farbror' },
    { from: 'örjanhillbom', to: 'lottahillbom', label: 'gift' },
    { from: 'lottahillbom', to: 'emilhedlund', label: 'barn' },
    { from: 'emilhedlund', to: 'elinnyström', label: 'sambo' },
    { from: 'lottahillbom', to: 'charliehillbom' },
    { from: 'davidhåkansson', to: 'charliehillbom', label: 'sambo' },


    { from: 'simonhillbom', to: 'tintinlagerstedt', label: 'Faster' },
    { from: 'tintinlagerstedt', to: 'jonaslagerstedt', label: 'gift' },
    { from: 'tintinlagerstedt', to: 'filippalagerstedt', label: 'barn'  },
    { from: 'tintinlagerstedt', to: 'fabianlagerstedt', label: 'barn'  },
    { from: 'tintinlagerstedt', to: 'jonathanlagerstedt', label: 'barn'  },

    // {from: 'jeanettehillbom', to: 'björnhillbom', label: 'Gift'},

    { from: 'josefinhillbom', to: 'evalisekarlsson', label: 'Mamma' },
    { from: 'josefinhillbom', to: 'börjekarlsson', label: 'Pappa' },
    { from: 'josefinhillbom', to: 'johankarlsson', label: 'Bror' },
    { from: 'josefinhillbom', to: 'antonkarlsson', label: 'Bror' },
    { from: 'antonkarlsson', to: 'carinakarlsson', label: 'gift' },
    { from: 'johankarlsson', to: 'sarakarlsson', label: 'förlovade' },

    { from: 'carinakarlsson', to: 'alvakarlsson', label: 'barn'  },
    { from: 'carinakarlsson', to: 'alexanderroserlius', label: 'barn'  },
    { from: 'carinakarlsson', to: 'ludvigroserlius', label: 'barn'  },

    { from: 'sarakarlsson', to: 'alfredkarlsson', label: 'barn'  },

    { from: 'josefinhillbom', to: 'evagustavsson', label: 'Faster' },
    { from: 'evagustavsson', to: 'alexandragustavsson', label: 'barn'  },
    { from: 'alexandragustavsson', to: 'johanwesterberg', label: 'sambo' },
    { from: 'evagustavsson', to: 'karlgustavsson', label: 'barn'  },
    { from: 'karlgustavsson', to: 'linagustavsson', label: 'gift' },

    { from: 'josefinhillbom', to: 'lill-annikabörjesson', label: 'Moster' },
    { from: 'mattiasbrant', to: 'lill-annikabörjesson', label: 'gift' },

    { from: 'josefinhillbom', to: 'catarinanyberg', label: 'Moster' },
    { from: 'lellenyberg', to: 'catarinanyberg', label: 'gift' },
    { from: 'catarinanyberg', to: 'olofnyberg', label: 'barn'  },
    { from: 'catarinanyberg', to: 'elinnyberg', label: 'barn'  },
    { from: 'carlelfström', to: 'elinnyberg', label: 'sambo'},

    { from: 'josefinhillbom', to: 'sunebörjesson', label: 'Morbror' },
    { from: 'anitabröjesson', to: 'sunebörjesson', label: 'gift' },

    { from: 'josefinhillbom', to: 'ingebörjesson', label: 'Morbror' },
    { from: 'annikabörjesson', to: 'ingebörjesson', label: 'Gift' },
    { from: 'annikabörjesson', to: 'johannesbörjesson', label: 'barn'  },
    { from: 'viktoriabörjesson', to: 'johannesbörjesson', label: 'gift' },

    { from: 'annikabörjesson', to: 'teresiabörjesson', label: 'barn'  },
    { from: 'niclasgamme', to: 'teresiabörjesson', label: 'förlovade' },


    // {from: 'evalisekarlsson', to: 'börjekarlsson', label: 'Gift'},

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
    // { from: 'joellindholm', to: 'lth' },

    // LTH related
    { from: 'joellindholm', to: 'simonhillbom', label: 'gymnasiet' },
    { from: 'joellindholm', to: 'nikitamaldanerfrohm', label: 'sambo' },
    { from: 'glyphandersson', to: 'linnéanyman', label: 'sambo' },

    // LTH relations
    { from: 'mazdakfarzone', to: 'sandraolsson', label: 'förlovade' },
    { from: 'robinlindberg', to: 'elinnilsson', label: 'gift' },
    { from: 'kaiseråkerberg', to: 'saralindgren', label: 'sambo' },
    { from: 'perrylorénperván', to: 'gabriellalorénperván', label: 'gift' },
    { from: 'sannewintren', to: 'niklaswintren', label: 'gift' },

    { from: 'simonhillbom', to: 'daglindahl', label: 'ex granne' },
]);


var people = [
    {
        name: "Josefin Hillbom",
        id: "josefinhillbom"
    },
    {
        name: "Simon Hillbom",
        id: "simonhillbom",
        p: true
    },
    {
        name: "Alexander Roselius",
        id: "alexanderroserlius",
        p: true
    },
    {
        name: "Alexandra Gustavsson",
        id: "alexandragustavsson"
    },
    {
        name: "Johan Westerberg",
        id: "johanwesterberg",
        p: true
    },
    {
        name: "Alfred Karlsson",
        id: "alfredkarlsson",
        p: true
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
        id: "sunebörjesson",
        p: true
    },
    {
        name: "Annika Börjesson",
        id: "annikabörjesson"
    },
    {
        name: "Inge Börjesson",
        id: "ingebörjesson",
        p: true
    },
    {
        name: "Börje Karlsson",
        id: "börjekarlsson",
        p: true
    },
    {
        name: "Eva-Lise Karlsson",
        id: "evalisekarlsson"
    },
    {
        name: "Catarina Nyberg",
        id: "catarinanyberg"
    },
    {
        name: "Anton Karlsson",
        id: "antonkarlsson",
        p: true
    },
    {
        name: "Elin Nyberg",
        id: "elinnyberg"
    },
    {
        name: "Carl Elfström",
        id: "carlelfström",
        p: true
    },
    {
        name: "Eva Gustavsson",
        id: "evagustavsson"
    },
    {
        name: "Johan Karlsson",
        id: "johankarlsson",
        p: true
    },
    {
        name: "Sara Karlsson",
        id: "sarakarlsson"
    },
    {
        name: "Karl Gustavsson",
        id: "karlgustavsson",
        p: true
    },
    {
        fullname: 'Lennart Lyberg',
        name: "Lelle Nyberg",
        id: "lellenyberg",
        p: true
    },
    {
        name: "Carina Karlsson",
        id: "carinakarlsson"
    },
    {
        fullname: 'Annika Börjesson',
        name: "Lill-Annika Börjesson",
        id: "lill-annikabörjesson"
    },
    {
        name: "Mattias Brant",
        id: "mattiasbrant",
        p: true
    },
    {
        name: "Lina Gustavsson",
        id: "linagustavsson"
    },
    {
        name: "Ludwig Roselius",
        id: "ludvigroserlius",
        p: true
    },
    {
        name: "Niclas Gamme",
        id: "niclasgamme",
        p: true
    },
    {
        name: "Teresia Börjesson",
        id: "teresiabörjesson"
    },
    {
        name: "Olof Nyberg",
        id: "olofnyberg",
        p: true
    },
    {
        name: "Viktoria Börjesson",
        id: "viktoriabörjesson"
    },
    {
        name: "Johannes Börjesson",
        id: "johannesbörjesson",
        p: true
    },
    {
        name: "Dag Lindahl",
        id: "daglindahl",
        p: true
    },
    {
        name: "Elin Nilsson",
        id: "elinnilsson"
    },
    {
        name: "Robin Lindberg",
        id: "robinlindberg",
        p: true
    },
    {
        fullname: "Fredrik Andersson",
        name: "Glyph Andersson",
        id: "glyphandersson",
        p: true
    },
    {
        name: "Linnéa Nyman",
        id: "linnéanyman"
    },
    {
        name: "Joel Lindholm",
        id: "joellindholm",
        p: true
    },
    {
        name: "Nikita Maldaner Frohm",
        id: "nikitamaldanerfrohm"
    },
    {
        fullname: 'Fredrik Åkerberg',
        name: "Kaiser Åkerberg",
        id: "kaiseråkerberg",
        p: true
    },
    {
        name: "Sara Lindgren",
        id: "saralindgren"
    },
    {
        name: "Mazdak Farzone",
        id: "mazdakfarzone",
        p: true
    },
    {
        name: "Sandra Olsson",
        id: "sandraolsson"
    },
    {
        fullname: 'Daniel Lorén Perván',
        name: "Perry Lorén Perván",
        id: "perrylorénperván",
        p: true
    },
    {
        name: "Gabriella Lorén Perván",
        id: "gabriellalorénperván"
    },
    {
        name: "Peter Seimar",
        id: "peterseimar",
        p: true
    },
    {
        name: "Sanne Wintren",
        id: "sannewintren"
    },
    {
        name: "Niklas Wintren",
        id: "niklaswintren",
        p: true
    },
    {
        name: "Björn Hillbom",
        id: "björnhillbom",
        p: true
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
        id: "davidhåkansson",
        p: true
    },
    {
        name: "Elin Nyström",
        id: "elinnyström"
    },
    {
        name: "Emil Hedlund",
        id: "emilhedlund",
        p: true
    },
    {
        name: "Fabian Lagerstedt",
        id: "fabianlagerstedt",
        p: true
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
        id: "jonaslagerstedt",
        p: true
    },
    {
        name: "Tintin Lagerstedt",
        id: "tintinlagerstedt"
    },
    {
        name: "Jonathan Lagerstedt",
        id: "jonathanlagerstedt",
        p: true
    },
    {
        name: "Örjan Hillbom",
        id: "örjanhillbom",
        p: true
    },
    {
        name: "Lotta Hillbom",
        id: "lottahillbom"
    },
    {
        name: "Samuel Zeitler",
        id: "samuelzeitler",
        p: true
    },
    {
        name: "Sofie Hillbom",
        id: "sofiehillbom"
    }, 
    {
        name: "LTH",
        id: "lth",
        p: true
    }
    
]