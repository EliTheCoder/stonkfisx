import {Game} from "hika";
function staticEvaluate(game: Game) {
	let total = 0;
	let pieces = game.getPois();
	if (game.getMovesForTeam(Team.WHITE).length === 0) return Infinity;
	if (game.getMovesForTeam(Team.BLACK).length === 0) return -Infinity;
	total += pieces
		.map(p => Math.sign(p.piece.team - 0.5))
		.reduce((a, b) => a + b);
	return total;
}
export function evaluate(
	game: Game,
	turn: Team,
	depth: number,
	alpha: number = -Infinity,
	beta: number = Infinity
) {
	if (depth === 0 || game.getMovesForTeam(turn)) {
		return staticEvaluate(game);
	}
	if (turn === Team.WHITE) {
		let maxEval = -Infinity;
		let moves = game.getMovesForTeam(turn);
		for (let i of moves) {
			let newGame = game;
			newGame.move(i);
			let score = evaluate(newGame, Team.BLACK, depth - 1, alpha, beta);
			maxEval = Math.max(maxEval, score);
			alpha = Math.max(alpha, score);
			if (beta <= alpha) break;
		}
		return maxEval;
	}
	if (turn === Team.BLACK) {
		let minEval = Infinity;
		let moves = game.getMovesForTeam(turn);
		for (let i of moves) {
			let newGame = game;
			newGame.move(i);
			let score = evaluate(newGame, Team.WHITE, depth - 1, alpha, beta);
			minEval = Math.min(minEval, score);
			beta = Math.min(alpha, score);
			if (beta <= alpha) break;
		}
		return minEval;
	}
}

enum Team {
	WHITE = 0,
	BLACK = 1
}
