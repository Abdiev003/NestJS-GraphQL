// ** NestJS Imports **
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

// ** Entity Imports **
import { Pet } from './entity/pet.entity';
import { Owner } from '../owners/entities/owner.entity';

// ** Service Imports **
import { PetsService } from './pets.service';

// ** Dto Imports **
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query((returns) => Pet)
  pet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Mutation((returns) => Pet)
  updatePet(
    @Args('updatePetInput') updatePetInput: UpdatePetInput,
  ): Promise<Pet> {
    return this.petsService.update(updatePetInput);
  }

  @Mutation((returns) => Pet)
  removePet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.remove(id);
  }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
}
