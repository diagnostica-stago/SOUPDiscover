﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using SoupDiscover.Core.Respository;
using SoupDiscover.Dto;
using SoupDiscover.ORM;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoupDiscover.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepositoriesController : ControllerBase
    {
        private readonly DataContext _context;

        public RepositoriesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Repositories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepositoryDto>>> GetRepository()
        {
            var list = await _context.Repositories.ToListAsync();
            var dtos = list.Select(r => r.ToDto());
            return CreatedAtAction("GetAllRepositories", dtos);
        }

        // GET: api/Repositories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RepositoryDto>> GetRepository(string id)
        {
            var repository = await _context.Repositories.FindAsync(id);

            if (repository == null)
            {
                return NotFound();
            }

            return repository.ToDto();
        }

        // PUT: api/Repositories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRepository(string id, RepositoryDto repositorydto)
        {
            if (id != repositorydto.name)
            {
                return BadRequest();
            }

            var repository = repositorydto.ToModel();
            _context.Repositories.Update(repository);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RepositoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Repositories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RepositoryDto>> PostRepository(RepositoryDto repositoryDto)
        {
            var repository = repositoryDto.ToModel();
            if (repository == null)
            {
                return UnprocessableEntity($"The repository type {repositoryDto.repositoryType} is not supported!");
            }
            _context.Repositories.Add(repository);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRepository", new { id = repository.Name }, repository);
        }

        // DELETE: api/Repositories/5
        [HttpDelete("{repositoryId}")]
        public async Task<ActionResult<RepositoryDto>> DeleteRepository(string repositoryId)
        {
            var repositoryTask = _context.Repositories.FindAsync(repositoryId);
            var projectOfTheRepositoryTask = _context.Projects.Where(p => p.RepositoryId == repositoryId).ToArrayAsync();
            var repository = await repositoryTask;
            if (repository == null)
            {
                return NotFound();
            }
            var projectOfTheRepository = await projectOfTheRepositoryTask;
            if (projectOfTheRepository.Length > 0)
            {
                return Problem($"Il faut suprimer les projets {string.Join(",", projectOfTheRepository.Select(e => e.RepositoryId))} avant de supprimer le dépot {repositoryId}.");
            }

            _context.Repositories.Remove(repository);
            await _context.SaveChangesAsync();
            var repositoryDto = repository.ToDto();
            if (repository == null)
            {
                return Problem($"Repository type {typeof(Repository)} is not supported!");
            }
            return repositoryDto;
        }

        private bool RepositoryExists(string id)
        {
            return _context.Repositories.Any(e => e.Name == id);
        }
    }
}
