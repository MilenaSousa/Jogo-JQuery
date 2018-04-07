var rodada = 1; //Isso vai controlar a quantidade de rodadas do jogo
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);


// ZERANDO A MATRIZ
for( var i=1; i<=3; i++){
	matriz_jogo['a'][i] = 0;
	matriz_jogo['b'][i] = 0;
	matriz_jogo['c'][i] = 0;
}


$(document).ready(function(){

	$('#btn_iniciar_jogo').click(function(){


		var nome1 = $('#entrada_apelido_jogador_1').val();
		var nome2 = $('#entrada_apelido_jogador_2').val();

		if((nome1 == "") && (nome2 == "")){
			alert('Dê um apelido aos seus jogadores!');
			return false;
		}else if(nome1 == ""){
			alert('Insira um apleido para o jogador 1');
			return false;
		}else if (nome2==""){
			alert('Insira um apelido para o jogador 2');
			return false;
		}

		// CONTROLA VIZUALIZAÇÃO DAS DIVS
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();


		// EXIBI OS APELIDOS
		$('#nome_jogador_1').html(nome1);
		$('#nome_jogador_2').html(nome2);

	});

	// ID DA AREA CLICADA
	$('.jogada').click(function(){
		var id_campo_clicado = this.id;
		$('#'+id_campo_clicado).off();
		jogada(id_campo_clicado);

	});


	function jogada(id){
		var icone = '';
		var ponto = 0;
		var aux = 0;


		if((rodada % 2!=0)){
			ponto = -1; // Jogador 1 é identificado com o -1
			icone = 'url("imagens/marcacao_1.png")';
		}else if((rodada % 2 == 0)){
			ponto = 1; // Jogador 2 é identificado com o 1
			icone = 'url("imagens/marcacao_2.png")';
		}

		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('-'); // Trunca a String e transforma em array, tira o '-'

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		aux = matriz_jogo[linha_coluna[0]][linha_coluna[1]];

		verifica_combinacao();

	}

	function verifica_combinacao(){
		var pontos = 0;

		//HORIZINTAL
		for(var i = 1; i<=3; i++){
			pontos += matriz_jogo['a'][i];
		}

		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i<=3; i++){
			pontos += matriz_jogo['b'][i];
		}

		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i<=3; i++){
			pontos += matriz_jogo['c'][i];
		}

		ganhador(pontos);


		// VERTICAL
		for(var i = 1; i<=3; i++){
			pontos = 0;
			pontos += matriz_jogo['a'][i];
			pontos += matriz_jogo['b'][i];
			pontos += matriz_jogo['c'][i];

			ganhador(pontos);
		}

		//DIAGONAL
		pontos = 0; 
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0; 
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);

		console(matriz_jogo);
	}

	function ganhador(pts){
		var ganhador = 0;
		if(pts == -3){
			alert('Jogador 1 é o vencedor!');
			$('.jogada').off();	
		}else if(pts == 3){
			alert('Jogador 2 é o vencedor!');
			$('.jogada').off();	
		}
	}

});