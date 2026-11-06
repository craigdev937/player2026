import express from "express";
import { dBase } from "../data/Data.js";
import { PlayZod } from "../validation/Zod.js";
import type { PlayType } from "../validation/Zod.js";
import type { IPlay } from "../models/Interfaces.js";

class PlayerClass {
    Create: express.Handler = async (req, res, next) => {
        try {
            const P = PlayZod.parse(req.body);
            const QRY = `INSERT INTO players
            (type, first, last, age, info, image) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values = [P.type, P.first, P.last, 
                P.age, P.info, P.image];
            const player = await dBase.query<PlayType>(QRY, values);
            res
                .status(201)
                .json({
                    success: true,
                    message: "The Player was Created!",
                    data: player.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Creating a new Player!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    FetchAll: express.Handler = async (req, res, next) => {
        try {
            const QRY = "SELECT * FROM players ORDER BY id ASC";
            const players = await dBase.query<IPlay>(QRY);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "All Players Listed!",
                    count: players.rows.length,
                    data: players.rows
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Creating a new Player!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    GetOne: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const QRY = "SELECT * FROM players WHERE id=$1";
            const value = [id];
            const player = await dBase.query<IPlay>(QRY, value);
            res
                .status(201)
                .json({
                    success: true,
                    message: "One Player Listed!",
                    data: player.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Creating a new Player!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    Update: express.Handler = async (req, res, next) => {
        try {
            const P = PlayZod.parse(req.body);
            const { id } = req.params;
            const QRY = `UPDATE players 
            SET type=$1, first=$2, last=$3, age=$4, info=$5, 
            image=$6, updated_at=NOW() WHERE id=$7 RETURNING *`;
            const values = [P.type, P.first, P.last, P.age, 
                P.info, P.image, id];
            const player = await dBase.query<IPlay>(QRY, values);
            res
                .status(201)
                .json({
                    success: true,
                    message: "The Player is Updated!",
                    data: player.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Updating a new Player!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };

    Delete: express.Handler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const QRY = "DELETE FROM players WHERE id=$1";
            const delPlayer = await dBase.query<IPlay>(QRY, [id]);
            return res
                .status(201)
                .json({
                    success: true,
                    message: "The Player was Deleted!",
                    data: delPlayer.rows[0]
                });
        } catch (error) {
            res
                .status(res.statusCode)
                .json({
                    success: false,
                    message: "Error Deleting the Player!",
                    error: error instanceof Error ?
                        error.message : "Unknown Error!"
                });
            return next(error);
        }
    };
};

export const PLAYER: PlayerClass = new PlayerClass();




// const FOLDER = "player2026/players";
// const uploadToCloudinary = (
//     buffer: Buffer
// ): Promise<{ secure_url: string; public_id: string }> => {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//             { folder: FOLDER, resource_type: "image" },
//             (error, result) => {
//                 if (error || !result) {
//                     return reject(
//                         error ?? new Error("Cloudinary upload failed!")
//                     );
//                 }
//                 resolve({
//                     secure_url: result.secure_url,
//                     public_id: result.public_id
//                 });
//             }
//         );
//         stream.end(buffer);
//     });
// };

// Create: express.Handler = async (req, res, next) => {
//         let uploadedPublicId: string | null = null;
//         try {
//             const P = PlayZod.parse(req.body);
//             let image = P.image ?? null;
//             let imagePublicId: string | null = null;

//             if (req.file) {
//                 const uploaded = await uploadToCloudinary(req.file.buffer);
//                 image = uploaded.secure_url;
//                 imagePublicId = uploaded.public_id;
//                 uploadedPublicId = uploaded.public_id;
//             }

//             const QRY = `INSERT INTO players
//             (type, first, last, age, info, image, image_public_id) 
//             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
//             const values = [
//                 P.type,
//                 P.first,
//                 P.last,
//                 P.age,
//                 P.info ?? null,
//                 image,
//                 imagePublicId
//             ];
//             const player = await dBase.query<PlayType>(QRY, values);
//             return res
//                 .status(res.statusCode)
//                 .json({
//                     success: true,
//                     message: "The Player was Created!",
//                     data: player.rows[0]
//                 });
//         } catch (error) {
//             // Don't leave an orphaned asset in Cloudinary if the insert failed.
//             if (uploadedPublicId) {
//                 await cloudinary.uploader
//                     .destroy(uploadedPublicId)
//                     .catch(() => undefined);
//             }
//             res
//                 .status(res.statusCode)
//                 .json({
//                     success: false,
//                     message: "Error Creating a new Player!",
//                     error: error instanceof Error ?
//                         error.message : "Unknown Error!"
//                 });
//             next(error);
//         }
//     };



