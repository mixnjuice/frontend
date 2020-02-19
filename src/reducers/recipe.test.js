import { initialState, actions, types, reducer } from './recipe';

describe('recipe reducer', () => {
  const id = 'testing';
  const recipe = {
    id,
    name: 'Testing'
  };
  const error = new Error('Failure.');

  it('has EDIT_RECIPE action', () => {
    expect(actions.editRecipe()).toEqual({
      type: types.EDIT_RECIPE
    });
  });

  it('handles EDIT_RECIPE action', () => {
    expect(reducer(initialState, actions.editRecipe())).toEqual(initialState);
  });

  it('has EDIT_RECIPE_SUCCESS action', () => {
    expect(actions.editRecipeSuccess()).toEqual({
      type: types.EDIT_RECIPE_SUCCESS
    });
  });

  it('handles EDIT_RECIPE_SUCCESS action when editing', () => {
    const state = {
      ...initialState,
      editing: true
    };

    expect(reducer(state, actions.editRecipeSuccess())).toEqual(state);
  });

  it('handles EDIT_RECIPE_SUCCESS action when not editing', () => {
    const state = {
      ...reducer(initialState, actions.editRecipe()),
      active: 'test'
    };

    expect(reducer(state, actions.editRecipeSuccess())).toEqual({
      ...initialState,
      editing: true,
      active: state.active,
      savePoint: state.active
    });
  });

  it('has EDIT_RECIPE_FAILURE action', () => {
    expect(actions.editRecipeFailure(error)).toEqual({
      type: types.EDIT_RECIPE_FAILURE,
      error
    });
  });

  it('handles EDIT_RECIPE_FAILURE action', () => {
    expect(reducer(initialState, actions.editRecipeFailure(error))).toEqual({
      ...initialState,
      error
    });
  });

  it('has REVERT_RECIPE action', () => {
    expect(actions.revertRecipe()).toEqual({
      type: types.REVERT_RECIPE
    });
  });

  it('handles REVERT_RECIPE action', () => {
    expect(reducer(initialState, actions.revertRecipe())).toEqual(initialState);
  });

  it('has REVERT_RECIPE_SUCCESS action', () => {
    expect(actions.revertRecipeSuccess()).toEqual({
      type: types.REVERT_RECIPE_SUCCESS
    });
  });

  it('handles REVERT_RECIPE_SUCCESS action when editing', () => {
    expect(
      reducer(
        {
          ...initialState,
          editing: true,
          savePoint: 'test'
        },
        actions.revertRecipeSuccess()
      )
    ).toEqual({
      ...initialState,
      editing: false,
      savePoint: null,
      active: 'test'
    });
  });

  it('handles REVERT_RECIPE_SUCCESS action when not editing', () => {
    expect(reducer(initialState, actions.revertRecipeSuccess())).toEqual(
      initialState
    );
  });

  it('has REVERT_RECIPE_FAILURE action', () => {
    expect(actions.revertRecipeFailure(error)).toEqual({
      type: types.REVERT_RECIPE_FAILURE,
      error
    });
  });

  it('handles REVERT_RECIPE_FAILURE action', () => {
    expect(reducer(initialState, actions.revertRecipeFailure(error))).toEqual({
      ...initialState,
      error
    });
  });

  it('has REQUEST_RECIPE action', () => {
    expect(actions.requestRecipe(id)).toEqual({
      type: types.REQUEST_RECIPE,
      id
    });
  });

  it('handles REQUEST_RECIPE action', () => {
    expect(reducer(initialState, actions.requestRecipe(id))).toEqual(
      initialState
    );
  });

  it('has REQUEST_RECIPE_SUCCESS action', () => {
    expect(actions.requestRecipeSuccess(recipe)).toEqual({
      type: types.REQUEST_RECIPE_SUCCESS,
      recipe
    });
  });

  it('handles REQUEST_RECIPE_SUCCESS action', () => {
    expect(reducer(initialState, actions.requestRecipeSuccess(recipe))).toEqual(
      {
        ...initialState,
        active: recipe
      }
    );
  });

  it('has REQUEST_RECIPE_FAILURE action', () => {
    expect(actions.requestRecipeFailure(error)).toEqual({
      type: types.REQUEST_RECIPE_FAILURE,
      error
    });
  });

  it('handles REQUEST_RECIPE_FAILURE action', () => {
    expect(reducer(initialState, actions.requestRecipeFailure(error))).toEqual({
      ...initialState,
      error
    });
  });

  it('has UPDATE_RECIPE action', () => {
    expect(actions.updateRecipe(id)).toEqual({
      type: types.UPDATE_RECIPE,
      id
    });
  });

  it('handles UPDATE_RECIPE action', () => {
    expect(reducer(initialState, actions.updateRecipe(id))).toEqual(
      initialState
    );
  });

  it('has UPDATE_RECIPE_SUCCESS action', () => {
    expect(actions.updateRecipeSuccess(recipe)).toEqual({
      type: types.UPDATE_RECIPE_SUCCESS,
      recipe
    });
  });

  it('handles UPDATE_RECIPE_SUCCESS action', () => {
    expect(reducer(initialState, actions.updateRecipeSuccess(recipe))).toEqual({
      ...initialState,
      active: recipe
    });
  });

  it('has UPDATE_RECIPE_FAILURE action', () => {
    expect(actions.updateRecipeFailure(error)).toEqual({
      type: types.UPDATE_RECIPE_FAILURE,
      error
    });
  });

  it('handles UPDATE_RECIPE_FAILURE action', () => {
    expect(reducer(initialState, actions.updateRecipeFailure(error))).toEqual({
      ...initialState,
      error
    });
  });

  it('handles default action', () => {
    expect(reducer(initialState)).toEqual(initialState);
  });
});
