import { Request, Response } from "express";
import prisma from "../db";

const addEvent = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude, name, description, start_date, end_date } =
      req.body;

    await prisma.event.create({
      data: {
        name,
        longitude,
        latitude,
        description,
        start_date,
        end_date,
      },
    });

    res.status(200).send("successfully created event");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        end_date: {
          gte: new Date().toISOString(),
        },
      },
    });

    res.status(200).send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error getting events" });
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: {
        event_id: id,
      },
    });

    res.status(201).send("successfully deleted event");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error deleting event" });
  }
};

const addBloc = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude, name } = req.body;

    await prisma.bloc.create({
      data: {
        longitude,
        latitude,
        name,
      },
    });

    res.status(200).send(`successfully created bloc '${name}'`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const getBlocs = async (req: Request, res: Response) => {
  try {
    const blocs = await prisma.bloc.findMany();

    res.status(200).send(blocs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error getting blocs" });
  }
};

export { addEvent, getEvents, deleteEvent, addBloc, getBlocs };
